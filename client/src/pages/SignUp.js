"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const UserForm_1 = __importDefault(require("../components/UserForm"));
const SignUp = () => {
    return (<UserForm_1.default name="Sign Up" signUp/>);
};
exports.default = SignUp;