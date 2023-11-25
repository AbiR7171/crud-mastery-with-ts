/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from "express";
import { userServices } from "./user.service";
import { userValidationSchema } from "./user.validation";

const createUser = async(req:Request, res:Response) =>{
    
 

    

     try{

        const { user: userData  } = req.body;

        const validateData =  userValidationSchema.parse(userData);

       
        
        const result = await userServices.createUserInToDB(validateData);

    res.status(200).json({
        "success": true,
        "message": "User created successfully!",
        data:result
    })

     // eslint-disable-next-line @typescript-eslint/no-explicit-any
     }catch( err: any){ 

       
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


 const updateSingleUser = async(req:Request, res:Response)=>{

    try{
        const userId = req.params.userId;

  
        const {updateData} = req.body;


       

       
  
        const result = await userServices.updateSingleUserFromDB(userId, updateData);

    
        res.status(200).json({
            "success": true,
            "message": "User updated successfully!",
            data:updateData
        })
  
        return result
    }catch(err: any){
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


 const deleteUser = async (req:Request, res:Response) =>{

        try{ 
               const userId = req.params.userId
               await userServices.deleteUserFromDB(userId)
               res.status(200).json({
                "success": true,
                "message": "User deleted successfully!",
                data: null
            }) 


        }catch(err: any){
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


 const addOrder = async(req:Request, res:Response)=>{

         try{
            const userId =   req.params.userId;
            const orders = req.body;
 
            await userServices.createOrderFromDB(userId, orders);
            res.status(200).json({
                "success": true,
                "message": "Order Created successfully!",
                data: null
            })
         }catch(err: any){
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

  
 const getAllOrderFromSingleUser = async(req:Request, res:Response) =>{

         try{
                 const userId = req.params.userId;
                 const result = await userServices.allOrderOfSingleUserInDB(userId);

                 res.status(200).json({
                    "success": true,
                    "message": "Order Created successfully!",
                    data: result
                })
         }catch(err: any){
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


 const calculateTotalPriceOfSingleUser = async(req:Request, res:Response) =>{

        try{
             const userId = req.params.userId;

             const result = await  userServices.calculateTotalPriceOfSingleUserInDB(userId)
             res.status(200).json({
                "success": true,
                "message": "Total price calculated successfully!",
                 data: result
            })
        }catch(err: any){
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
    getSingleUser,
    updateSingleUser,
    deleteUser,
    addOrder,
    getAllOrderFromSingleUser,
    calculateTotalPriceOfSingleUser
     
}