"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserResponseSchema = exports.UserSchema = void 0;
const zod_1 = require("zod");
exports.UserSchema = zod_1.z.object({
    userId: zod_1.z.string(), // .uuid(),
    content: zod_1.z.string().min(1),
});
exports.UserResponseSchema = zod_1.z.object({
    message: zod_1.z.string(),
    content: zod_1.z.string(),
});
