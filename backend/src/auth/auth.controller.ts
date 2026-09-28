import { loginService, registerService,resendOtpService,verifyOtpService } from "./auth.service.js";
import type { Request,Response } from "express";
import { statusCode,messages } from "../constants/index.js";
import { apiResponse } from "../utils/apiResponse.js";
export const register = async (
    req: Request,
    res: Response
): Promise<void> => {
    await registerService(req.body);
    res.status(statusCode.OK).json(apiResponse(messages.SUCCESS,messages.REGISTER_SUCCESS));
};
export const verifyOtp=async(req:Request,res:Response):Promise<void>=>{
    await verifyOtpService(req.body);
    res.status(statusCode.OK).json(apiResponse(messages.SUCCESS,messages.VERIFY_OTP_SUCCESS));

}
export const resendOtp=async(req:Request,res:Response):Promise<void>=>{
    await resendOtpService(req.body);
    res.status(statusCode.OK).json(apiResponse(messages.SUCCESS,messages.OTP_RESENT_SUCCESSFULLY));
}
export const login=async(req:Request,res:Response):Promise<void>=>{
    const {accessToken,refreshToken}=await loginService(req.body);
    res.cookie("refreshToken",refreshToken,{
        httpOnly:true,
        secure:true,
        sameSite:true
    });
    res.status(statusCode.OK).json(apiResponse(messages.SUCCESS,messages.LOGIN_SUCCESS,{accessToken}));
}
