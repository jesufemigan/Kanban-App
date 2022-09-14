"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Task_1 = __importDefault(require("./Task"));
const Column = ({ title, tasks }) => {
    const color = '#' + (Math.random() * 0xFFFFFF << 0).toString(16).padStart(6, '0');
    return (<div className="column">
      <span>
        <div className="column__color" style={{ backgroundColor: color }}></div>
        <p className="column__title">{`${title}${`(${tasks.length})`}`}</p>
      </span>
      <div className={`${tasks.length === 0 ? 'empty' : ''} column__tasks`}>
        {tasks.map(task => (<Task_1.default title={task.title} key={task._id} task={task} subtasks={task.subtasks}/>))}
      </div>

    </div>);
};
exports.default = Column;
