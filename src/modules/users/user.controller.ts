import { Request, Response } from "express";
import { userServices } from "./user.service";

const createUser = async(req:Request, res:Response) =>{
    
    const {user} = req.body;

    console.log(user);

     try{
        
    const result = await userServices.createUserInToDB(user);

    res.status(200).json({
        success:true,
        message:"user has been created",
        data:result
    })

     // eslint-disable-next-line @typescript-eslint/no-explicit-any
     }catch( err: any){
         res.status(403).json({
             success:false,
             message: err.message,
            data:err
         })
     }
    
}


export const userController = {

    createUser
     
}