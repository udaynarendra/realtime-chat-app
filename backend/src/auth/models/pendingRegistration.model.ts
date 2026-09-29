import mongoose from 'mongoose';
import type { IUser } from '../auth.types.js';
const emailVerificationSchema = new mongoose.Schema<IUser>({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        match: [/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/, "Invalid email address"]
    },
    password: {
        type: String,
        required: true
    },
    fullname: {
        type: String,
        trim: true,
        required: true
    },
    otp: {
        type: String,
        required: true,
    },
    otpExpiresAt: {
        type: Date,
        required: true,

    },
    otpAttempts: {
        type:Number,
        default: 0
    },
    otpRequestCount: {
        type: Number,
        default: 0,
    },
    lastOtpSentAt: {
        type: Date,
        required: true
    },
    expiresAt: {
        type: Date,
        required: true
    }
}, {
    timestamps: true
})
export const EmailVerification = mongoose.model<IUser>('EmailVerification', emailVerificationSchema);