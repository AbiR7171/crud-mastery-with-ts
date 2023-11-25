import { Model } from "mongoose"




export type TOrder = {
 
    productName: string,
    price:number,
    quantity:number
  
}

export type TUser = {
     userId:string,
     username:string,
     password:string,
     fullName: {
         firstName: string,
         lastName:string
     },
     age:number,
     email:string,
     isActive:boolean,
     hobbies:string[],
     address:{
         street:string,
         city:string,
         country:string
     },
     orders?:TOrder[]
} 




export type UserMethods ={
    isUserExits(id: string): Promise<TUser | null >
}


export type UserModel = Model<TUser, Record<string, never>, UserMethods>