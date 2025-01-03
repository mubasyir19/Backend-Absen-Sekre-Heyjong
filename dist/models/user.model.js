"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    name: { type: String, require: true },
    username: { type: String, require: true, unique: true },
    password: { type: String, require: true },
}, { timestamps: true });
exports.User = (0, mongoose_1.model)('User', userSchema);
