import type { ErrorRequestHandler } from "express";
import { ApiError } from "../utils/ApiError.js";
export const errorMiddleware:ErrorRequestHandler=(
    err,req,res,next
)=>{
    if(err instanceof ApiError && err.isOperational){
        res.status(err.statusCode).json({
            success:false,
            message:err.message
        });
        return;

    }
    res.status(500).json({
        success:false,
        message:"Internal Server Error"
    });
}