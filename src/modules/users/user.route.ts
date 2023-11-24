import express from "express";
import { userController } from "./user.controller";

const route = express.Router();


route.post("/api/users", userController.createUser)
 route.get("/api/users", userController.getAllUser)
 route.get("/api/users/:userId", userController.getSingleUser)





export const userRoute = route;