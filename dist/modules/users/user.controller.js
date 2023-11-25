"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userController = void 0;
const user_service_1 = require("./user.service");
const user_validation_1 = require("./user.validation");
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { user: userData } = req.body;
        const validateData = user_validation_1.userValidationSchema.parse(userData);
        const result = yield user_service_1.userServices.createUserInToDB(validateData);
        res.status(200).json({
            "success": true,
            "message": "User created successfully!",
            data: result
        });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }
    catch (err) {
        res.status(403).json({
            success: false,
            message: err.message || "something went wrong",
            data: err
        });
    }
});
const getAllUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield user_service_1.userServices.getAllUserFromDB();
        res.status(200).json({
            "success": true,
            "message": "User fetched successfully!",
            data: result
        });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }
    catch (err) {
        res.status(403).json({
            success: false,
            message: "something went wrong",
            data: err
        });
    }
});
const getSingleUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.userId;
        const result = yield user_service_1.userServices.getSingleUserFromDB(userId);
        res.status(200).json({
            "success": true,
            "message": "User fetched successfully!",
            data: result
        });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }
    catch (err) {
        res.status(403).json({
            success: false,
            message: err.message || "something went wrong",
            error: {
                "code": 404,
                "description": err.message || "User not found!"
            }
        });
    }
});
const updateSingleUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.userId;
        const { updateData } = req.body;
        const result = yield user_service_1.userServices.updateSingleUserFromDB(userId, updateData);
        res.status(200).json({
            "success": true,
            "message": "User updated successfully!",
            data: updateData
        });
        return result;
    }
    catch (err) {
        res.status(403).json({
            success: false,
            message: err.message || "something went wrong",
            error: {
                "code": 404,
                "description": err.message || "User not found!"
            }
        });
    }
});
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.userId;
        yield user_service_1.userServices.deleteUserFromDB(userId);
        res.status(200).json({
            "success": true,
            "message": "User deleted successfully!",
            data: null
        });
    }
    catch (err) {
        res.status(403).json({
            success: false,
            message: err.message || "something went wrong",
            error: {
                "code": 404,
                "description": err.message || "User not found!"
            }
        });
    }
});
const addOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.userId;
        const orders = req.body;
        yield user_service_1.userServices.createOrderFromDB(userId, orders);
        res.status(200).json({
            "success": true,
            "message": "Order Created successfully!",
            data: null
        });
    }
    catch (err) {
        res.status(403).json({
            success: false,
            message: err.message || "something went wrong",
            error: {
                "code": 404,
                "description": err.message || "User not found!"
            }
        });
    }
});
const getAllOrderFromSingleUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.userId;
        const result = yield user_service_1.userServices.allOrderOfSingleUserInDB(userId);
        res.status(200).json({
            "success": true,
            "message": "Order Created successfully!",
            data: result
        });
    }
    catch (err) {
        res.status(403).json({
            success: false,
            message: err.message || "something went wrong",
            error: {
                "code": 404,
                "description": err.message || "User not found!"
            }
        });
    }
});
const calculateTotalPriceOfSingleUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.userId;
        const result = yield user_service_1.userServices.calculateTotalPriceOfSingleUserInDB(userId);
        res.status(200).json({
            "success": true,
            "message": "Total price calculated successfully!",
            data: result
        });
    }
    catch (err) {
        res.status(403).json({
            success: false,
            message: err.message || "something went wrong",
            error: {
                "code": 404,
                "description": err.message || "User not found!"
            }
        });
    }
});
exports.userController = {
    createUser,
    getAllUser,
    getSingleUser,
    updateSingleUser,
    deleteUser,
    addOrder,
    getAllOrderFromSingleUser,
    calculateTotalPriceOfSingleUser
};
