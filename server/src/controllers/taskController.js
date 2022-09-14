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
exports.deleteTask = exports.updateSubTask = exports.editTask = exports.addTask = void 0;
const boardModel_1 = __importDefault(require("../models/boardModel"));
const express_async_handler_1 = __importDefault(require("express-async-handler"));
exports.addTask = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { board_id } = req.params;
    const { title, description, subtasks, status } = req.body;
    const board = yield boardModel_1.default.findById(board_id);
    if (!board) {
        throw new Error("Board does not exist");
    }
    const column = board === null || board === void 0 ? void 0 : board.columns.find(column => column.title === status);
    column === null || column === void 0 ? void 0 : column.tasks.push({ title, description, subtasks, status });
    // board.save()
    yield board.save();
    const allBoard = yield boardModel_1.default.find({ userId: req.userId });
    res.status(200).json(allBoard);
}));
exports.editTask = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { board_id } = req.params;
    const { task_id, title, description, status, subtasks } = req.body;
    const board = yield boardModel_1.default.findById(board_id);
    if (!board) {
        throw new Error("Board does not exist");
    }
    const taskToUpdate = board.columns.find(column => column.title === status).tasks.find(task => task._id.toString() === task_id);
    taskToUpdate.title = title;
    taskToUpdate.description = description;
    taskToUpdate.status = status;
    taskToUpdate.subtasks = subtasks;
    yield board.save();
    const allBoard = yield boardModel_1.default.find({ userId: req.userId });
    res.status(200).json(allBoard);
}));
exports.updateSubTask = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const { board_id } = req.params;
    const { status, taskId, subId } = req.body;
    const board = yield boardModel_1.default.findById(board_id);
    if (!board) {
        throw new Error("Board does not exist");
    }
    const subTaskToUpdate = (_b = (_a = board.columns.find(column => column.title === status)) === null || _a === void 0 ? void 0 : _a.tasks.find(task => { var _a; return ((_a = task._id) === null || _a === void 0 ? void 0 : _a.toString()) === taskId; })) === null || _b === void 0 ? void 0 : _b.subtasks.find(sub => sub._id.toString() === subId);
    subTaskToUpdate.isCompleted = !(subTaskToUpdate === null || subTaskToUpdate === void 0 ? void 0 : subTaskToUpdate.isCompleted);
    yield board.save();
    const allBoard = yield boardModel_1.default.find({ userId: req.userId });
    res.status(200).json(allBoard);
}));
exports.deleteTask = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { board_id } = req.params;
    const { status, task_id } = req.body;
    const board = yield boardModel_1.default.findById(board_id);
    if (!board) {
        throw new Error("Board does not exist");
    }
    const columnToUpdate = board.columns.find(column => column.title === status);
    const taskIndex = columnToUpdate.tasks.findIndex(task => task._id.toString() === task_id);
    columnToUpdate.tasks.splice(taskIndex, 1);
    yield board.save();
    const allBoard = yield boardModel_1.default.find({ userId: req.userId });
    res.status(200).json(allBoard);
}));
