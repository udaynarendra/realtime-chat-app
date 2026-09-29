export interface RegisterData{
    username:string;
    email:string;
    password:string;
    fullname:string;
};
export interface RegisterResult{
    user:{
        id:string;
        username:string;
        email:string;
        fullname:string;
    }
}
export interface IUser{
    username:string;
    email:string;
    password:string;
    fullname:string;
    otp:string;
    otpExpiresAt:Date;
    otpAttempts:number;
    otpRequestCount:number;
    lastOtpSentAt:Date;
    expiresAt:Date;
    createdAt:Date;
    updatedAt:Date;
}
export interface Users{
    _id:string;
    username:string;
    email:string;
    password:string;
    fullname:string;
    avatar:string | null;
    isonline:boolean;
    lastseen:Date | null;
    isEmailVerified:boolean
    createdAt:Date;
    updatedAt:Date;
}
export interface emailverify extends IUser{
_id:string;
}
export type emailVerificationData=Omit<IUser,"createdAt"|"updatedAt">;
export type UserData =
    Omit<Users, "_id" | "createdAt" | "updatedAt">
    & Partial<Pick<Users, "avatar" | "isonline" | "lastseen">>;
    
export interface RefreshTokenData{
    user:string,
    tokenHash:string,
    expiresAt:Date
}