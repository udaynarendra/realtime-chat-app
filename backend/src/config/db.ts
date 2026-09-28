import mongoose from 'mongoose';
import {env} from './env.js';
const connectDB=async():Promise<void>=>{
    try{
    await mongoose.connect(env.MONGODB_URL);
    console.log('DataBase connected !!!');
    }
    catch(error){
        console.error('mongodb connection failed:',error);
        process.exit(1);
    }

}
export default connectDB;