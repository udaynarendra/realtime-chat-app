import express ,{type Express} from 'express';
import { errorMiddleware } from './middlewares/errorHandler.middleware.js';
import { authRouter } from './auth/auth.routes.js';
const app:Express=express();
app.use(express.json())
app.use('/api/v1/auth',authRouter);
app.use(errorMiddleware)
export default app;