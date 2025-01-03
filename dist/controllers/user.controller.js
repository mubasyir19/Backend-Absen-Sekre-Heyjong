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
exports.protectedAuth = exports.addAdmin = exports.loginAdmin = void 0;
const user_model_1 = require("../models/user.model");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// import { CustomRequest } from '../types';
const loginAdmin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    try {
        const checkUser = yield user_model_1.User.findOne({ username: username });
        if (!checkUser) {
            return res.status(404).json({
                status: 404,
                message: 'User not found',
                data: null,
            });
        }
        const checkPassword = yield bcryptjs_1.default.compare(password, checkUser.password);
        if (!checkPassword) {
            return res.status(400).json({
                status: 400,
                message: 'Invalid password',
                data: null,
            });
        }
        const user = {
            id: checkUser._id,
            name: checkUser.name,
            username: checkUser.username,
        };
        const token = jsonwebtoken_1.default.sign(user, process.env.SECRET_KEY, {
            expiresIn: '24h',
        });
        return res.status(200).json({
            status: 200,
            message: 'login successfully',
            data: {
                id: user.id,
                name: user.name,
                access_token: token,
            },
        });
    }
    catch (error) {
        return res.status(500).json({
            status: 500,
            message: 'An error occured ',
            data: null,
        });
    }
});
exports.loginAdmin = loginAdmin;
const addAdmin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, username, password } = req.body;
    try {
        const checkUser = yield user_model_1.User.findOne({ username: username });
        if (checkUser) {
            return res.status(404).json({
                status: 404,
                message: 'Account has registered',
                data: null,
            });
        }
        const salt = yield bcryptjs_1.default.genSalt();
        const hashedPassword = yield bcryptjs_1.default.hash(password, salt);
        const newAdmin = yield user_model_1.User.create({ name, username, password: hashedPassword });
        return res.status(201).json({
            status: 200,
            message: 'login successfully',
            data: newAdmin,
        });
    }
    catch (error) {
        return res.status(500).json({
            status: 500,
            message: 'An error occured ',
            data: null,
        });
    }
});
exports.addAdmin = addAdmin;
const protectedAuth = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.status(200).json({
        status: 200,
        message: 'you have access to this protected route',
        data: req.user,
    });
});
exports.protectedAuth = protectedAuth;
