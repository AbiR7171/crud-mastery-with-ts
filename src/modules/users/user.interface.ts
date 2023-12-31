import { Model } from "mongoose"




export type TOrder = {
 
    productName: string,
    price:number,
    quantity:number
  
}

export type TUser = {
     userId:number,
     username:string,
     password:string | undefined,
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
    isUserExits(id: number): Promise<TUser | null >
}


// eslint-disable-next-line @typescript-eslint/ban-types
export type UserModel = Model<TUser, {}, UserMethods>