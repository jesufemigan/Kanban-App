"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const hooks_1 = require("../app/hooks");
const currentBoardReducer_1 = require("../features/currentBoardReducer");
const modalSlice_1 = require("../features/modal/modalSlice");
const Task = ({ title, subtasks, task }) => {
    const dispatch = (0, hooks_1.useAppDispatch)();
    const handleOpenTask = () => {
        dispatch((0, modalSlice_1.openModal)("TaskDetails"));
        dispatch((0, currentBoardReducer_1.changeTask)(task));
    };
    const completedSubtask = task.subtasks.filter((sub) => sub.isCompleted).length;
    // const allSubtasks = useAppSelector(state => getAllSubtasks(state.ids))
    // const completedSubTask = allSubtasks.filter((sub:any) => sub.isCompleted)
    // console.log(allSubtasks)
    const totalSubtask = task.subtasks.length;
    return (<div className="task" onClick={handleOpenTask}>
      <h3>{title}</h3>
      <p>
        <>
        {completedSubtask} of {totalSubtask} subtasks
        </>
      </p>
    </div>);
};
exports.default = Task;
