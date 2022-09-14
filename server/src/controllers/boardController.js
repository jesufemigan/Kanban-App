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
exports.deleteBoard = exports.editBoard = exports.addNewBoard = exports.getAllBoard = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const boardModel_1 = __importDefault(require("../models/boardModel"));
exports.getAllBoard = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const boards = yield boardModel_1.default.find({ userId: req.userId });
    res.status(200).json(boards);
}));
exports.addNewBoard = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, columns } = req.body;
    const newBoard = new boardModel_1.default({
        userId: req.userId,
        title,
        columns
    });
    yield newBoard.save();
    res.json(newBoard);
}));
exports.editBoard = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { board_id } = req.params;
    const { title, columns } = req.body;
    yield boardModel_1.default.findByIdAndUpdate(board_id, { title, columns }, { new: true });
    const allBoard = yield boardModel_1.default.find({ userId: req.userId });
    res.status(200).json(allBoard);
}));
exports.deleteBoard = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { board_id } = req.params;
    yield boardModel_1.default.findByIdAndDelete(board_id);
    const allBoard = yield boardModel_1.default.find({ userId: req.userId });
    res.json(allBoard);
}));
