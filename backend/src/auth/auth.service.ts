import type { RegisterData, RegisterResult } from "./auth.types.js";
import { createEmailData, createRefreshToken, createUser, emailVerify, findToken, revokedToken, updateEmailVerification, user } from "./auth.repository.js";
import { ApiError } from "../utils/ApiError.js";
import { statusCode, messages } from "../constants/index.js";
import { generateOtp, hashOtp } from "../utils/otp.js";
import { comparePassword, hashPassword } from "../utils/passwordHashing.js";
import { sendEmail } from "../utils/email.js";
import { otpEmailTemplate } from '../templates/email.template.js'
import { generateAccessToken, generateRefreshToken } from "../utils/tokens.js";
export const registerService = async (validateData: RegisterData | null): Promise<void> => {
  if (!validateData) {
    throw new ApiError(statusCode.BAD_REQUEST, 'data is required', true)
  }
  const isUserExisting = await user(validateData.email);
  if (isUserExisting) {
    throw new ApiError(statusCode.CONFLICT, messages.ALREADY, true);
  }

  const isEmailExisting = await emailVerify(validateData.email);
  if (isEmailExisting) {
    throw new ApiError(statusCode.CONFLICT, messages.EMAIL_ALREADY_REGISTERED, true);
  }
  const otp = generateOtp();
  const hashedOtp = hashOtp(otp);
  const hashedPassword = await hashPassword(validateData.password);
  await createEmailData({
    username: validateData.username,
    email: validateData.email,
    fullname: validateData.fullname,
    otp: hashedOtp,
    password: hashedPassword,
    otpRequestCount: 1,
    otpAttempts: 0,
    otpExpiresAt: new Date(Date.now() + 5 * 60 * 1000),
    lastOtpSentAt: new Date(Date.now()),
    expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000)
  })
  await sendEmail(validateData.email, "Verify your email address", otpEmailTemplate(otp, validateData.fullname))
}

export const verifyOtpService = async (validateData: { email: string, otp: string }): Promise<void> => {
  const user = await emailVerify(validateData.email);
  if (!user) {
    throw new ApiError(statusCode.BAD_REQUEST, messages.EMAIL_NOT_FOUND, true)
  }
  if (user.expiresAt < new Date(Date.now())) {
    throw new ApiError(statusCode.BAD_REQUEST, messages.OTP_EXPIRED, true
    )
  }
  if (user.otpAttempts > 5) {
    throw new ApiError(statusCode.BAD_REQUEST, messages.OTP_ATTEMPTS_EXCEEDED, true)
  }
  const hashedOtp = hashOtp(validateData.otp);
  if (user.otp !== hashedOtp) {
    throw new ApiError(statusCode.BAD_REQUEST, messages.INVALID_OTP, true);
  }
  await createUser({
    username: user.username,
    email: user.email,
    password: user.password,
    fullname: user.fullname,
    isEmailVerified: true,
    avatar: null,
    isonline: false,
    lastseen: null
  });

}
export const resendOtpService = async (validateData: { email: string }): Promise<void> => {
  const otp = generateOtp();
  const hashedOtp = hashOtp(otp);
  const isEmailExisting = await emailVerify(validateData.email);;
  if (!isEmailExisting) {
    throw new ApiError(statusCode.BAD_REQUEST, messages.NOT_FOUND, true);
  }
  const count = isEmailExisting.otpRequestCount += 1;
  updateEmailVerification(validateData.email, {
    otp: hashedOtp,
    otpExpiresAt: new Date(Date.now() + 5 * 60 * 1000),
    lastOtpSentAt: new Date(Date.now()),
    otpRequestCount: count
  });
  await sendEmail(validateData.email, "Verify your email address", otpEmailTemplate(otp, isEmailExisting.fullname));
}

export const loginService = async (validateData: { email: string, password: string }): Promise<{ accessToken: string, refreshToken: string }> => {
  const isUser = await user(validateData.email);
  if (!isUser) {
    throw new ApiError(statusCode.BAD_REQUEST, messages.USER_NOT_FOUND, true);
  }
  if (!isUser.isEmailVerified) {
    throw new ApiError(statusCode.BAD_REQUEST, messages.EMAIL_NOT_VERIFIED, true);
  }
  const isPasswordMatch = await comparePassword(validateData.password, isUser.password);
  if (!isPasswordMatch) {
    throw new ApiError(statusCode.BAD_REQUEST, messages.INVALID_PASSWORD, true);
  }
  const accessToken = generateAccessToken(isUser._id.toString());
  const refreshToken = generateRefreshToken(isUser._id.toString());
  await createRefreshToken({
    user: isUser._id,
    tokenHash: refreshToken,
    expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
  })
  return { accessToken, refreshToken };
}

export const logOutService = async (refreshtoken: string) => {
  if (!refreshtoken) {
    throw new ApiError(statusCode.BAD_REQUEST, messages.REFRESH_TOKEN_REQUIRED, true);
  }
  const token = await findToken(refreshtoken);
  if (!token) {
    throw new ApiError(statusCode.UNAUTHORIZED, messages.INVALID_REFRESH_TOKEN, true);
  }
  await revokedToken(token.user.toString(), refreshtoken);
}