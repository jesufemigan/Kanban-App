"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BoardModal_1 = __importDefault(require("./BoardModal"));
const EditBoard = () => {
    return (<BoardModal_1.default title="Edit Board" buttonName="Save Changes" edit/>);
};
exports.default = EditBoard;
