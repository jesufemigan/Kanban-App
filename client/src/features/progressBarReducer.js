"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetProgress = exports.setProgress = exports.progressBarSlice = void 0;
const toolkit_1 = require("@reduxjs/toolkit");
const initialState = {
    progress: 0
};
exports.progressBarSlice = (0, toolkit_1.createSlice)({
    name: 'progressBar',
    initialState,
    reducers: {
        setProgress: (state) => {
            state.progress = 100;
        },
        resetProgress: (state) => {
            state.progress = 0;
        }
    }
});
_a = exports.progressBarSlice.actions, exports.setProgress = _a.setProgress, exports.resetProgress = _a.resetProgress;
exports.default = exports.progressBarSlice.reducer;
