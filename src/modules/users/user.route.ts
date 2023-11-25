import express from "express";
import { userController } from "./user.controller";

const route = express.Router();


route.post("/api/users", userController.createUser)
 route.get("/api/users", userController.getAllUser)
 route.get("/api/users/:userId", userController.getSingleUser)
 route.put("/api/users/:userId", userController.updateSingleUser)
 route.delete("/api/users/:userId", userController.deleteUser)
 route.put("/api/users/:userId/orders", userController.addOrder)
 route.get("/api/users/:userId/orders", userController.getAllOrderFromSingleUser)
 route.get("/api/users/:userId/orders/total-price", userController.calculateTotalPriceOfSingleUser)





export const userRoute = route;