import express from "express";
import { userController } from "./user.controller";

const route = express.Router();


route.post("/api/users", userController.createUser)
 route.get("/api/users", userController.getAllUser)
 route.get("/api/users/:userId", userController.getSingleUser)
 route.put("/api/users/:userId", userController.updateSingleUser)
 route.delete("/api/users/:userId", userController.deleteUser)





export const userRoute = route;