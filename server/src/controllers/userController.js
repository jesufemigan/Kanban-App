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
exports.userSignin = exports.userSignup = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userModel_1 = __importDefault(require("../models/userModel"));
exports.userSignup = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password } = req.body;
    const user = yield userModel_1.default.findOne({ email });
    if (user) {
        throw new Error("User already exists");
    }
    const saltRounds = 10;
    const salt = bcrypt_1.default.genSaltSync(saltRounds);
    const hashedPassword = bcrypt_1.default.hashSync(password, salt);
    const newUser = new userModel_1.default({
        name,
        email,
        password: hashedPassword
    });
    yield newUser.save();
    res.status(200).json({
        name: newUser.name,
        email: newUser.email,
        token: generateToken(newUser.email, newUser.id)
    });
}));
exports.userSignin = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const user = yield userModel_1.default.findOne({ email });
    if (!user) {
        throw new Error("User does not exist");
    }
    const isPasswordCorrect = bcrypt_1.default.compareSync(password, user.password);
    if (isPasswordCorrect) {
        res.status(200).json({
            name: user.name,
            email: user.email,
            token: generateToken(email, user.id)
        });
    }
    else {
        res.statusCode = 400;
        throw new Error("Incorrect Password");
    }
}));
const generateToken = (email, id) => {
    return jsonwebtoken_1.default.sign({ email, id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};
