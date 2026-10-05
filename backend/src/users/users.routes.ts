import type { Router } from "express";
import express from 'express';
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { changePassword, getProfileUser, updateUserProfile } from "./users.controller.js";
export const userRouter:Router=express.Router();
userRouter.get('/me',authMiddleware,getProfileUser);
userRouter.patch('/me',authMiddleware,updateUserProfile);
userRouter.patch('/me/password',authMiddleware,changePassword);