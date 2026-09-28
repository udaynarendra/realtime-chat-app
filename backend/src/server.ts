import app from './app.js';
import connectDB from './config/db.js';
const startServer=async():Promise<void>=>{
    await connectDB();
    app.listen(5000,()=>console.log('server is running on port 5000'));
}
startServer();