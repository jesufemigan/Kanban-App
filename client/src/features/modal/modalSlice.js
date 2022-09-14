"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.closeModal = exports.openModal = exports.modalSlice = void 0;
const toolkit_1 = require("@reduxjs/toolkit");
const initialState = {
    modalType: ""
};
exports.modalSlice = (0, toolkit_1.createSlice)({
    name: 'modal',
    initialState,
    reducers: {
        openModal: (state, action) => {
            return Object.assign(Object.assign({}, state), { modalType: action.payload });
        },
        closeModal: (state) => {
            return Object.assign(Object.assign({}, state), { modalType: "" });
        }
    }
});
_a = exports.modalSlice.actions, exports.openModal = _a.openModal, exports.closeModal = _a.closeModal;
exports.default = exports.modalSlice.reducer;
