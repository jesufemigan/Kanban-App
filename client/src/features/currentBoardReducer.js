"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.changeTask = exports.changeBoardId = exports.currentBoardSlice = void 0;
const toolkit_1 = require("@reduxjs/toolkit");
const initialState = {
    boardId: '',
    task: {}
};
exports.currentBoardSlice = (0, toolkit_1.createSlice)({
    name: 'currentBoard',
    initialState,
    reducers: {
        changeBoardId: (state, action) => {
            state.boardId = action.payload;
        },
        changeTask: (state, action) => {
            state.task = action.payload;
        }
    }
});
_a = exports.currentBoardSlice.actions, exports.changeBoardId = _a.changeBoardId, exports.changeTask = _a.changeTask;
exports.default = exports.currentBoardSlice.reducer;
