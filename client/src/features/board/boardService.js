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
const API_URL = '/api/boards/';
const getAllBoards = (token) => __awaiter(void 0, void 0, void 0, function* () {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };
    const response = yield axios_1.default.get(API_URL, config);
    return response.data;
});
const createNewBoard = (token, boardDetails) => __awaiter(void 0, void 0, void 0, function* () {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };
    const response = yield axios_1.default.post(API_URL, boardDetails, config);
    return response.data;
});
const editBoard = (token, boardId, updatedBoardDetails) => __awaiter(void 0, void 0, void 0, function* () {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };
    const response = yield axios_1.default.patch(API_URL + boardId, updatedBoardDetails, config);
    return response.data;
});
const deleteBoard = (token, boardId) => __awaiter(void 0, void 0, void 0, function* () {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };
    const response = yield axios_1.default.delete(API_URL + boardId, config);
    return response.data;
});
const boardService = {
    getAllBoards,
    createNewBoard,
    editBoard,
    deleteBoard
};
exports.default = boardService;
