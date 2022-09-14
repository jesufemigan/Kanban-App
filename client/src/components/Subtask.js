"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const hooks_1 = require("../app/hooks");
const boardSlice_1 = require("../features/board/boardSlice");
const Subtask = ({ sub, setNewTask, newTask, index }) => {
    const { task } = (0, hooks_1.useAppSelector)(state => state.ids);
    const dispatch = (0, hooks_1.useAppDispatch)();
    const [completeSubtask, setCompleteSubTask] = (0, react_1.useState)(sub.isCompleted);
    const handleSubTaskChange = (id, index) => {
        const details = {
            status: task.status,
            taskId: task._id,
            subId: id
        };
        dispatch((0, boardSlice_1.updateSubTask)(details));
        setCompleteSubTask((prev) => !prev);
        const subtasks = newTask.subtasks.slice();
        subtasks[index] = Object.assign(Object.assign({}, subtasks[index]), { isCompleted: !subtasks[index].isCompleted });
        setNewTask((prev) => (Object.assign(Object.assign({}, prev), { subtasks })));
    };
    return (<div key={sub._id} className="allSubtasks__each">
    <label className="checkbox">
      {sub.title}
      <input type="checkbox" checked={completeSubtask} onChange={() => handleSubTaskChange(sub._id, index)}/>
      <span className="checkmark"></span>
    </label>
  </div>);
};
exports.default = Subtask;
