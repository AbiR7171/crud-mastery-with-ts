import z from "zod"




const ordersValidationSchema =  z.object({
     productName: z.string().min(1, {message:"ProductName is required"}),
     price: z.number().min(1, {message:"price is required"}),
      quantity: z.number().min(1, {message:"quantity is required"})
})

export const userValidationSchema = z.object({
    userId: z.number().min(1, {message:"user id is required"}),
    username:z.string().min(1, {message:"username id is required"}),
    password:z.string().min(1, {message:"password id is required"}),
    fullName:z.object({
         firstName:z.string().min(1, {message:"firstName id is required"}),
         lastName:z.string().min(1, {message:"lastName id is required"})
    }),
    age:z.number().int().positive({message:"Age is required and must be a positive number"}),
    email:z.string().email({message:"Invalid email format"}),
    isActive:z.boolean().default(true),
    hobbies:z.array(z.string().min(1, {message:"At least one hobby is required"})),
    address:z.object({
         street:z.string().min(1, {message:"street id is required"}),
         city:z.string().min(1, {message:"City id is required"}),
         country:z.string().min(1, {message:"Country id is required"})
    }),
    orders:z.optional(z.array(ordersValidationSchema))
})