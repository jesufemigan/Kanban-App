"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Modal_1 = __importDefault(require("../Modal"));
const icon_vertical_ellipsis_svg_1 = __importDefault(require("../../../assets/icon-vertical-ellipsis.svg"));
const hooks_1 = require("../../../app/hooks");
const modalSlice_1 = require("../../../features/modal/modalSlice");
const react_1 = require("react");
const Subtask_1 = __importDefault(require("../../Subtask"));
// import { getAllSubtasks } from "../../../features/currentBoardReducer"
const TaskDetails = () => {
    const { boardId } = (0, hooks_1.useAppSelector)(state => state.ids);
    const { boards } = (0, hooks_1.useAppSelector)(state => state.board);
    const { task } = (0, hooks_1.useAppSelector)(state => state.ids);
    const [newTask, setNewTask] = (0, react_1.useState)(task);
    const completedSubTask = newTask.subtasks.filter((sub) => sub.isCompleted).length;
    const totalSubTask = newTask.subtasks.length;
    const [dropDown, setDropDown] = (0, react_1.useState)(false);
    // const [completeSubTask, setCompleteSubTask] = useState(false)
    const dispatch = (0, hooks_1.useAppDispatch)();
    const currentBoard = boards.find(board => board._id === boardId);
    // const allSubtasks = useAppSelector(state => getAllSubtasks(state.ids))
    // const completedSubTask = allSubtasks.filter((sub:any) => sub.isCompleted)
    const taskRef = (0, react_1.useRef)(null);
    (0, react_1.useEffect)(() => {
        function handleClickOutside(e) {
            if (taskRef.current && !taskRef.current.contains(e.target)) {
                setDropDown(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [taskRef]);
    return (<Modal_1.default>
      <div className="taskDetails">
        <div className="taskDetails__header">
          <h2>{newTask.title}</h2>
          <div className="taskDetails__action--container">
            <img src={icon_vertical_ellipsis_svg_1.default} alt="" onClick={() => setDropDown(prev => !prev)}/>
            <div className={`taskDetails__action--content ${!dropDown ? `cancel` : ''}`} ref={taskRef}>
              <p onClick={() => dispatch((0, modalSlice_1.openModal)("EditTask"))}>Edit Task</p>
              <p onClick={() => dispatch((0, modalSlice_1.openModal)("DeleteTask"))}>Delete Task</p>
            </div>
          </div>
        </div>
        <p className="taskDetails__description">{newTask.description === "" ? 'No description' : task.description}</p>
        <p className="taskDetails__subtasks">Subtasks ({completedSubTask} of {totalSubTask})</p>
        <div className="allSubtasks">
          {newTask.subtasks.length === 0 ? (<p>No subtasks</p>) : (newTask.subtasks.map((sub, index) => (<Subtask_1.default sub={sub} key={sub._id} setNewTask={setNewTask} newTask={newTask} index={index}/>)))}
        </div>
        <div className="dropDown">
          <label htmlFor="">Current Status</label>
          <select name="columns" id="" value={task.status} disabled>
            {currentBoard === null || currentBoard === void 0 ? void 0 : currentBoard.columns.map(column => (<option value={column.title} key={column._id}>{column.title}</option>))}
          </select>
        </div>
      </div>
    </Modal_1.default>);
};
exports.default = TaskDetails;
