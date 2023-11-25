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
exports.userServices = void 0;
const user_model_1 = require("./user.model");
const createUserInToDB = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    const user = new user_model_1.User(userData);
    if (yield user.isUserExits(user.userId)) {
        throw new Error('User Already Exists');
    }
    const result = yield user.save();
    return result;
});
const getAllUserFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.find({}, { username: 1, age: 1, email: 1, address: 1, fullName: 1 });
    return result;
});
const getSingleUserFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const user = new user_model_1.User();
    if (yield user.isUserExits(id)) {
        const result = yield user_model_1.User.findOne({ userId: id }, { password: 0 });
        return result;
    }
    else {
        throw new Error("User not found");
    }
});
const updateSingleUserFromDB = (id, updateData) => __awaiter(void 0, void 0, void 0, function* () {
    const user = new user_model_1.User();
    if (yield user.isUserExits(id)) {
        const user = yield user_model_1.User.findOne({ userId: id }).select("-password");
        const result = yield user_model_1.User.updateOne({ user }, {
            $set: {
                userId: updateData.userId,
                username: updateData.username,
                password: updateData.password,
                fullName: {
                    firstName: updateData.fullName.firstName,
                    lastName: updateData.fullName.lastName
                },
                age: updateData.age,
                email: updateData.email,
                isActive: updateData.isActive,
                hobbies: updateData.hobbies,
                address: {
                    street: updateData.address.street,
                    city: updateData.address.city,
                    country: updateData.address.country
                }
            }
        });
        return result;
    }
    else {
        throw new Error("User not found");
    }
});
const deleteUserFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const user = new user_model_1.User();
    if (yield user.isUserExits(id)) {
        const result = yield user_model_1.User.deleteOne({ userId: id });
        return result;
    }
    else {
        throw new Error("User not found");
    }
});
const createOrderFromDB = (id, orders) => __awaiter(void 0, void 0, void 0, function* () {
    const user = new user_model_1.User();
    if (yield user.isUserExits(id)) {
        const result = yield user_model_1.User.updateOne({ userId: id }, { $push: { orders: orders } });
        return result;
    }
    else {
        throw new Error("User not found");
    }
});
const allOrderOfSingleUserInDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const user = new user_model_1.User();
    if (yield user.isUserExits(id)) {
        const result = yield user_model_1.User.findOne({ userId: id }, { orders: 1, _id: 0 });
        return result;
    }
    else {
        throw new Error("User not found");
    }
});
const calculateTotalPriceOfSingleUserInDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const user = new user_model_1.User();
    if (yield user.isUserExits(id)) {
        const result = yield user_model_1.User.aggregate([
            { $match: { userId: id } },
            { $unwind: "$orders" },
            {
                $group: {
                    _id: null,
                    totalPrice: { $sum: { $multiply: ["$orders.quantity", "$orders.price"] } }
                }
            },
            { $project: { totalPrice: 1, _id: 0 } }
        ]);
        return result[0];
    }
    else {
        throw new Error("User not found");
    }
});
exports.userServices = {
    createUserInToDB,
    getAllUserFromDB,
    getSingleUserFromDB,
    updateSingleUserFromDB,
    deleteUserFromDB,
    createOrderFromDB,
    allOrderOfSingleUserInDB,
    calculateTotalPriceOfSingleUserInDB
};
