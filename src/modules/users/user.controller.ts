import { Request, Response } from "express";
import { userServices } from "./user.service";
import { userValidationSchema } from "./user.validation";

const createUser = async(req:Request, res:Response) =>{
    
 

    

     try{

        const { user: userData  } = req.body;

        const validateData =  userValidationSchema.parse(userData);

        console.log(validateData);
        
        const result = await userServices.createUserInToDB(validateData);

    res.status(200).json({
        "success": true,
        "message": "User created successfully!",
        data:result
    })

     // eslint-disable-next-line @typescript-eslint/no-explicit-any
     }catch( err: any){ 

        console.log(err);
         res.status(403).json({
             success:false,
             message:err.message ||"something went wrong",
            data: err
         })
     }
    
} 



const getAllUser = async(req:Request, res:Response) =>{
     
    try{ 

        const result = await userServices.getAllUserFromDB();

        res.status(200).json({
            "success": true,
            "message": "User fetched successfully!",
            data:result
        })


   // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }catch(err: any){
        
        console.log(err);
        res.status(403).json({
            success:false,
            message:"something went wrong",
           data: err
        })
    }

}


const getSingleUser = async(req:Request, res:Response)=>{

     try{

        const userId = req.params.userId
         
        const result = await userServices.getSingleUserFromDB(userId) 
        res.status(200).json({
            "success": true,
            "message": "User fetched successfully!",
            data:result
        })

         // eslint-disable-next-line @typescript-eslint/no-explicit-any
     }catch(err: any){
         console.log(err);
         res.status(403).json({
            success:false,
            message: err.message ||"something went wrong",
            error:{
                "code":404,
                "description":err.message || "User not found!"
            }
        })
     }
}


export const userController = {

    createUser,
    getAllUser,
    getSingleUser
     
}