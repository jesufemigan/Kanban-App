"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const TaskModal_1 = __importDefault(require("./TaskModal"));
const AddTask = () => {
    return (<TaskModal_1.default title="Add a New Task" buttonName="Create Task"/>);
};
exports.default = AddTask;
