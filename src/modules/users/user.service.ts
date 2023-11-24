import { TUser } from "./user.interface";
import { User } from "./user.model";


const createUserInToDB =  async(userData:TUser)=>{
     
   const user = new User(userData);

   if( await user.isUserExits(user.userId)){
         throw new Error('User Already Exists')
   }

   const result = await user.save()
   
    return result;
   

} 


const getAllUserFromDB = async()=>{
          
    const result = await User.find({}, {username:1, age:1, email:1, address:1, fullName:1});

    return result
} 


 const getSingleUserFromDB = async(id: string) =>{

    const user = new User()

    if(await user.isUserExits(id)){
        const  result = await User.findOne({userId:id}, {password:0})
        return result
    }else{
         throw new Error("User not found")
    }
             
   
 }


export const userServices = {
     createUserInToDB,
     getAllUserFromDB,
     getSingleUserFromDB
}