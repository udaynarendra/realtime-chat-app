import express ,{type Express} from 'express';
import cookieParser from 'cookie-parser';
import { errorMiddleware } from './middlewares/errorHandler.middleware.js';
import { authRouter } from './auth/auth.routes.js';
import { userRouter } from './users/users.routes.js';
const app:Express=express();
app.use(express.json())
app.use(cookieParser());
app.use('/api/v1/auth',authRouter);
app.use('/api/v1/users',userRouter);
app.use(errorMiddleware)
export default app;