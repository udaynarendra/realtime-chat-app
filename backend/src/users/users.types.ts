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
export type updateUserInput=Partial<Users>; 

export type changePasswordInput={
    currentPassword:string;
    newPassword:string;
    confirmPassword:string;
}