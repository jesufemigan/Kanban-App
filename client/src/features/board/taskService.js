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
const axios_1 = __importDefault(require("axios"));
const API_URL = '/api/boards/task/';
const addNewTask = (token, boardId, taskDetails) => __awaiter(void 0, void 0, void 0, function* () {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };
    const response = yield axios_1.default.post(API_URL + boardId, taskDetails, config);
    return response.data;
});
const editTask = (token, boardId, updatedTaskDetails) => __awaiter(void 0, void 0, void 0, function* () {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };
    const response = yield axios_1.default.patch(API_URL + boardId, updatedTaskDetails, config);
    return response.data;
});
const updateSubTask = (token, boardId, details) => __awaiter(void 0, void 0, void 0, function* () {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };
    const response = yield axios_1.default.patch(API_URL + boardId + '/subtask', details, config);
    return response.data;
});
const deleteTask = (token, boardId, details) => __awaiter(void 0, void 0, void 0, function* () {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };
    const response = yield axios_1.default.patch(API_URL + boardId + '/deleteTask', details, config);
    return response.data;
});
const taskService = {
    addNewTask,
    editTask,
    updateSubTask,
    deleteTask
};
exports.default = taskService;
