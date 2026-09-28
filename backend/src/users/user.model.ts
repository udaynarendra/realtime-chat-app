import mongoose from 'mongoose';
const userSchema=new mongoose.Schema({
username:{
    type:String,
    trim:true,
    unique:true,
    required:true,
},
email:{
    type:String,
    trim:true,
    unique:true,
    lowercase:true,
    required:true,
    match:[/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,"please enter a valid email address"],
},
password:{
    type:String,
    required:true,
},
fullname:{
    type:String,
    trim:true,
    required:true,
},
avatar:{
    type:String,
    default :null,
},
isonline:{
    type:Boolean,
    default:false
},
lastseen:{
    type:Date,
    default:null
},
isEmailVerified:{
    type:Boolean,
    default:false
}, 
},{
    timestamps:true
})
const User=mongoose.model('User',userSchema);
export default User;