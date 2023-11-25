import express from "express";
import { userController } from "./user.controller";

const route = express.Router();


route.post("/users", userController.createUser)
 route.get("/users", userController.getAllUser)
 route.get("/users/:userId", userController.getSingleUser)
 route.put("/users/:userId", userController.updateSingleUser)
 route.delete("/users/:userId", userController.deleteUser)
 route.put("/users/:userId/orders", userController.addOrder)
 route.get("/users/:userId/orders", userController.getAllOrderFromSingleUser)
 route.get("/users/:userId/orders/total-price", userController.calculateTotalPriceOfSingleUser)





export const userRoute = route;