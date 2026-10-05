import type{Request ,Response} from 'express';
import { changePasswordService, getProfileUserService, updateUsersProfleService } from './users.service.js';
import { statusCode } from '../constants/statusCode.js';
import { apiResponse } from '../utils/apiResponse.js';
import { messages } from '../constants/messages.js';

export const getProfileUser=async(req:Request,res:Response):Promise<void>=>{
    const user=await getProfileUserService(req.user!.userId)
    res.status(statusCode.OK).json(apiResponse(messages.SUCCESS,messages.FETCHED,user));
}
export const updateUserProfile=async(req:Request,res:Response):Promise<void>=>{
const updatedUser=await updateUsersProfleService(req.user!.userId,req.body);
res.status(statusCode.OK).json(apiResponse(messages.SUCCESS,messages.PROFILE_UPDATE_SUCESS,{updatedUser}));
}

export const changePassword=async(req:Request,res:Response):Promise<void>=>{
await changePasswordService(req.user!.userId,req.body);
res.status(statusCode.OK).json(apiResponse(messages.SUCCESS,messages.PASSWORD_CHANGED_SUCCESSFULLY));
}