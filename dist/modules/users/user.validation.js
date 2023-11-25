"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userValidationSchema = void 0;
const zod_1 = __importDefault(require("zod"));
const ordersValidationSchema = zod_1.default.object({
    productName: zod_1.default.string().min(1, { message: "ProductName is required" }),
    price: zod_1.default.number().min(1, { message: "price is required" }),
    quantity: zod_1.default.number().min(1, { message: "quantity is required" })
});
exports.userValidationSchema = zod_1.default.object({
    userId: zod_1.default.string().min(1, { message: "user id is required" }),
    username: zod_1.default.string().min(1, { message: "username id is required" }),
    password: zod_1.default.string().min(1, { message: "password id is required" }),
    fullName: zod_1.default.object({
        firstName: zod_1.default.string().min(1, { message: "firstName id is required" }),
        lastName: zod_1.default.string().min(1, { message: "lastName id is required" })
    }),
    age: zod_1.default.number().int().positive({ message: "Age is required and must be a positive number" }),
    email: zod_1.default.string().email({ message: "Invalid email format" }),
    isActive: zod_1.default.boolean().default(true),
    hobbies: zod_1.default.array(zod_1.default.string().min(1, { message: "At least one hobby is required" })),
    address: zod_1.default.object({
        street: zod_1.default.string().min(1, { message: "street id is required" }),
        city: zod_1.default.string().min(1, { message: "City id is required" }),
        country: zod_1.default.string().min(1, { message: "Country id is required" })
    }),
    orders: zod_1.default.optional(zod_1.default.array(ordersValidationSchema))
});
