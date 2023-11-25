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


 const updateSingleUserFromDB = async( id:string,updateData: TUser) =>{

    const user = new User();

    if(await user.isUserExits(id)){
         
              const result = await User.updateOne({userId:id},{
                   $set:{
                         userId: updateData.userId,
                         username: updateData.username,
                         password:updateData.password,
                         fullName: {
                             firstName:updateData.fullName.firstName,
                             lastName:updateData.fullName.lastName
                         },
                         age:updateData.age,
                         email:updateData.email,
                         isActive:updateData.isActive,
                         hobbies:updateData.hobbies,
                         address:{
                             street: updateData.address.street,
                             city:updateData.address.city,
                             country:updateData.address.country
                         }

                      

                   }

                   
              }, {new:true, select: { password: 0}})
              

            

              return result
    }else{
        throw new Error("User not found")
   }





 } 



  const deletUserFromDB = async ( id: string) =>{

        const user = new User() ;

        if(await user.isUserExits(id)){

            const result = await User.deleteOne({userId:id})

            return result

        }else{
             throw new Error("User not found")
        }
  }


  


export const userServices = {
     createUserInToDB,
     getAllUserFromDB,
     getSingleUserFromDB,
     updateSingleUserFromDB,
     deletUserFromDB
}