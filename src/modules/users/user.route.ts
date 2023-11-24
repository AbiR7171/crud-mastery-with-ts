import express from "express";
import { userController } from "./user.controller";

const route = express.Router();


route.post("/api/users", userController.createUser)





export const userRoute = route;