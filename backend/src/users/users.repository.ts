import User from "./user.model.js";
import type { updateUserInput } from "./users.types.js";
export const getUser=async(userId:string)=>{
    return User.findOne({_id:userId})
    .select("username email fullname avatar isonline lastseen");
}

export const updateUser=async(userId:string,data:updateUserInput)=>{
    return User.findByIdAndUpdate({_id:userId},{$set:data},{returnDocument:'after'})
    .select("username email fullname avatar isonline lastseen");
}
export const checkDuplicateUserName = async (userId:string,
  username: string,
)=> {
  const existingUser = User.exists({
    username,
    _id:{$ne:userId}
  });

  return !!existingUser;
};