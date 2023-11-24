import { Request, Response } from "express";
import { userServices } from "./user.service";
import { userValidationSchema } from "./user.validation";

const createUser = async(req:Request, res:Response) =>{
    
 

    

     try{

        const { user: userData  } = req.body;

        const validateData =  userValidationSchema.parse(userData)
        
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
             message:"something went wrong",
            data: err
         })
     }
    
}


export const userController = {

    createUser
     
}