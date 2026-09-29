import type { emailVerificationData, emailverify, UserData, Users, RefreshTokenData } from "./auth.types.js"
import User from '../users/user.model.js'
import { EmailVerification } from "./models/pendingRegistration.model.js"
import { RefreshToken } from '../auth/models/RefreshToken.model.js';
export const user = async (email: string): Promise<Users | null> => {
    return await User.findOne({ email: email })

}
export const emailVerify = async (email: string): Promise<emailverify | null> => {
    return await EmailVerification.findOne({ email: email });
}
export const createEmailData = async (data: emailVerificationData) => {
    return EmailVerification.create(data);
}
export const createUser = async (data: UserData) => {
    return User.create(data);
}
export const updateEmailVerification = async (email: string, data: { otp: string, otpExpiresAt: Date, lastOtpSentAt: Date, otpRequestCount: number }) => {
    return EmailVerification.findOneAndUpdate(
        { email },
        {
            $set: data,

        },
        { returnDocument: 'after' }
    )
}
export const createRefreshToken = async (data: RefreshTokenData) => {
    return RefreshToken.create(data);
}
export const findToken = async (token: string) => {
    return RefreshToken.findOne({
        tokenHash: token,
        revokedAt: null
    })
}

export const revokedToken = async (userId: string, token: string) => {
    return RefreshToken.findOneAndUpdate(
        {
            user: userId,
            tokenHash: token

        },
        {
            $set: {
                revokedAt: new Date(Date.now())
            }
        },
            {
            returnDocument: 'after'
        }
        )
}