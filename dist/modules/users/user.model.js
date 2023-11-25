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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
/* eslint-disable @typescript-eslint/no-this-alias */
const mongoose_1 = require("mongoose");
const bcrypt_1 = __importDefault(require("bcrypt"));
const config_1 = __importDefault(require("../../config"));
const userSchema = new mongoose_1.Schema({
    userId: { type: String, required: [true, "Id is required"], unique: true },
    username: { type: String, required: [true, "user is required"], unique: true },
    password: { type: String, required: [true, "password is required"] },
    fullName: {
        firstName: { type: String, required: [true, "firstName is required"] },
        lastName: { type: String, required: [true, "lastName is required"] }
    },
    age: { type: Number, required: [true, "age is required"] },
    email: { type: String, required: [true, "email is required"], unique: true },
    isActive: { type: Boolean, default: true },
    hobbies: { type: [String], required: [true, "hobbies is required"] },
    address: {
        street: { type: String, required: [true, "street is required"] },
        city: { type: String, required: [true, "city is required"] },
        country: { type: String, required: [true, "country is required"] }
    },
    orders: [{ productName: { type: String, required: [true, "productName is required"] },
            price: { type: Number, required: [true, "price is required"] },
            quantity: { type: Number, required: [true, "quantity is required"] }
        }]
});
userSchema.methods.isUserExits = function (id) {
    return __awaiter(this, void 0, void 0, function* () {
        const existingUser = yield exports.User.findOne({ userId: id });
        return existingUser;
    });
};
userSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = this;
        user.password = yield bcrypt_1.default.hash(user.password, Number(config_1.default.bcrypt_salt));
        next();
    });
});
userSchema.post("save", function (doc, next) {
    //     doc.password = undefined;
    next();
});
//  userSchema.post("updateOne", function(doc,next){
//      this.updateOne({},{$unset:{password:1}} )
//      next()
//  })
exports.User = (0, mongoose_1.model)('User', userSchema);
