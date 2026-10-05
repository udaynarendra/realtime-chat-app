import { statusCode,messages} from '../constants/index.js';
import { ApiError } from '../utils/ApiError.js';
import {getUser,checkDuplicateUserName, updateUser} from './users.repository.js';
import type { changePasswordInput, updateUserInput } from './users.types.js';
import { hashPassword,comparePassword } from '../utils/passwordHashing.js';

export const getProfileUserService=async(userId:string)=>{
const user=await getUser(userId);
if(!user){
    throw new ApiError(statusCode.NOT_FOUND,messages.USER_NOT_FOUND,true);
}
return user;

}

export const updateUsersProfleService=async(userId:string,validateData:updateUserInput)=>{
    if(validateData.username){
const usernameExists = await checkDuplicateUserName(userId,validateData.username);

if (usernameExists) {
  throw new ApiError(statusCode.CONFLICT,messages.USER_NAME_ALREADY_EXISTS,true);
    
}
    }
    const updatedUser=await updateUser(userId,validateData);
    if(!updatedUser){
        throw new ApiError(statusCode.NOT_FOUND,messages.USER_NOT_FOUND,true);
    }
    return updatedUser;
    
}
export const changePasswordService=async(userId:string,validateData:changePasswordInput)=>{
    const hashedPassword=await hashPassword(validateData.currentPassword);
  const user=await getUser(userId);
if(!user){
    throw new ApiError(statusCode.NOT_FOUND,messages.USER_NOT_FOUND,true);
}
const isMatch=await comparePassword(validateData.currentPassword,hashedPassword);
if(!isMatch){
    throw new ApiError(statusCode.UNAUTHORIZED,messages.CURRENT_PASSWORD_INCORRECT,true);
}
const newHashedPassword=await hashPassword(validateData.newPassword);
await updateUser(userId,{password:newHashedPassword});
}