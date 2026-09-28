import type { emailVerificationData, emailverify, UserData, Users } from "./auth.types.js"
import User from '../users/user.model.js'
import { EmailVerification } from "./models/pendingRegistration.model.js"
export const user=async(email:string):Promise<Users | null>=>{
    return await User.findOne({email:email})

}
export const emailVerify=async(email:string):Promise<emailverify | null>=>{
    return await EmailVerification.findOne({email:email});
}
export const createEmailData=async(data:emailVerificationData)=>{
    return EmailVerification.create(data);
}
export const createUser=async(data:UserData)=>{
    return User.create(data);
}
export const updateEmailVerification=async(email:string,data:{otp:string,otpExpiresAt:Date,lastOtpSentAt:Date,otpRequestCount:number})=>{
return await EmailVerification.findOneAndUpdate(
    {email},
    {
        $set:data,
       
    },
     {returnDocument:'after'}
)
}