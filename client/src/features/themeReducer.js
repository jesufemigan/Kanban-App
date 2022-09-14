"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.changeTheme = exports.themeSlice = void 0;
const toolkit_1 = require("@reduxjs/toolkit");
const initialState = {
    theme: 'light'
};
exports.themeSlice = (0, toolkit_1.createSlice)({
    name: 'theme',
    initialState,
    reducers: {
        changeTheme: (state) => {
            state.theme = state.theme === 'light' ? 'dark' : 'light';
        }
    }
});
exports.changeTheme = exports.themeSlice.actions.changeTheme;
exports.default = exports.themeSlice.reducer;
