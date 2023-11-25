"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoute = void 0;
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("./user.controller");
const route = express_1.default.Router();
route.post("/users", user_controller_1.userController.createUser);
route.get("/users", user_controller_1.userController.getAllUser);
route.get("/users/:userId", user_controller_1.userController.getSingleUser);
route.put("/users/:userId", user_controller_1.userController.updateSingleUser);
route.delete("/users/:userId", user_controller_1.userController.deleteUser);
route.put("/users/:userId/orders", user_controller_1.userController.addOrder);
route.get("/users/:userId/orders", user_controller_1.userController.getAllOrderFromSingleUser);
route.get("/users/:userId/orders/total-price", user_controller_1.userController.calculateTotalPriceOfSingleUser);
exports.userRoute = route;
