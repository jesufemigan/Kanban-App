"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ModalDelete_1 = __importDefault(require("../ModalDelete"));
const DeleteTask = () => {
    return (<ModalDelete_1.default title="New Task" isTask/>);
};
exports.default = DeleteTask;