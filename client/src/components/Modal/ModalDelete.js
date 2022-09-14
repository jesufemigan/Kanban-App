"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Modal_1 = __importDefault(require("./Modal"));
const boardSlice_1 = require("../../features/board/boardSlice");
const hooks_1 = require("../../app/hooks");
const modalSlice_1 = require("../../features/modal/modalSlice");
const ModalDelete = ({ isTask, title }) => {
    const modalName = isTask ? 'task' : 'board';
    const dispatch = (0, hooks_1.useAppDispatch)();
    const { task } = (0, hooks_1.useAppSelector)(state => state.ids);
    const { status, _id } = task;
    const details = {
        task_id: _id,
        status
    };
    return (<Modal_1.default>
      <div className="deleteModal">
        <h3>Delete this {modalName}?</h3>
        <p>Are you sure you want to delete the '{title}' {modalName}? This action will remove all columns and tasks and cannot be reversed </p>

        <div>
          <button className="btn danger-btn" onClick={() => {
            if (isTask) {
                dispatch((0, boardSlice_1.deleteTask)(details));
            }
            else {
                dispatch((0, boardSlice_1.deleteBoard)());
            }
            dispatch((0, modalSlice_1.closeModal)());
        }}>Delete</button>
          <button className="btn primary-btn" onClick={() => dispatch((0, modalSlice_1.closeModal)())}>Cancel</button>
        </div>

      </div>
    </Modal_1.default>);
};
exports.default = ModalDelete;
