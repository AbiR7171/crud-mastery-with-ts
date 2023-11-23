import { Request, Response } from "express";
import { userServices } from "./user.service";

const createUser = async(req:Request, res:Response) =>{
    
    const {user} = req.body;

    console.log(user);


    const result = await userServices.createUserInToDB(user);

    res.status(200).json({
        success:true,
        message:"user has been created",
        data:result
    })

    
}


export const userController = {

    createUser
     
}