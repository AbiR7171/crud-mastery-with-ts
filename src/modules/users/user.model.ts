/* eslint-disable @typescript-eslint/no-this-alias */
import {  Schema, model } from 'mongoose';
import { TUser, UserMethods, UserModel } from './user.interface';
import bcrypt from "bcrypt";
import config from '../../config';


const userSchema = new Schema<TUser, UserModel, UserMethods>({
     userId:{type:String, required:[true, "Id is required"], unique:true},
     username:{type:String, required:[true, "user is required"],unique:true},
     password:{type:String, required:[true, "password is required"]},
     fullName: {
         firstName:{type:String, required:[true, "firstName is required"]},
         lastName:{type:String,required:[true, "lastName is required"]}
     },
     age:{type:Number, required:[true, "age is required"]},
     email:{type:String, required:[true, "email is required"], unique:true},
     isActive:{type:Boolean, default:true},
     hobbies:{type:[String], required:[true, "hobbies is required"]},
     address:{
         street:{type:String, required:[true, "street is required"]},
         city:{type:String, required:[true, "city is required"]},
         country:{type:String, required:[true, "country is required"]}
     }
}) 


  userSchema.methods.isUserExits = async function(id: string){
            
          const existingUser = await User.findOne({userId: id});

          return existingUser
  }



 userSchema.pre("save", async function (next){ 

      const user = this;

      user.password = await bcrypt.hash(user.password, Number(config.bcrypt_salt))

      next()

 })


 userSchema.post("save", function(doc, next){
 


  
      doc.password = undefined;

      next()
 })
 
//  userSchema.post("findOne", function(doc, next){
 


  
//       doc.password = undefined;

//       next()
//  })
 


export const User = model<TUser, UserModel>('User', userSchema);


