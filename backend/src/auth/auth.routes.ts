import express from 'express';
import type { Router } from 'express';
import { login, logOut, register, resendOtp, verifyOtp } from './auth.controller.js';
export const authRouter:Router=express.Router();
authRouter.post('/register',register);
authRouter.post('/verify-otp',verifyOtp);
authRouter.post('/resend-otp',resendOtp);
authRouter.post('/login',login);
authRouter.post('/logOut',logOut);