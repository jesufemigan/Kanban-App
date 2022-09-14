"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.store = void 0;
const toolkit_1 = require("@reduxjs/toolkit");
const modalSlice_1 = __importDefault(require("../features/modal/modalSlice"));
const boardSlice_1 = __importDefault(require("../features/board/boardSlice"));
const authSlice_1 = __importDefault(require("../features/auth/authSlice"));
const currentBoardReducer_1 = __importDefault(require("../features/currentBoardReducer"));
const themeReducer_1 = __importDefault(require("../features/themeReducer"));
const progressBarReducer_1 = __importDefault(require("../features/progressBarReducer"));
exports.store = (0, toolkit_1.configureStore)({
    reducer: {
        modal: modalSlice_1.default,
        auth: authSlice_1.default,
        board: boardSlice_1.default,
        ids: currentBoardReducer_1.default,
        theme: themeReducer_1.default,
        progress: progressBarReducer_1.default
    }
});
