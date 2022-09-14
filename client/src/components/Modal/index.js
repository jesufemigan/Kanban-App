"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AddTask_1 = __importDefault(require("./TaskModal/AddTask"));
const EditTask_1 = __importDefault(require("./TaskModal/EditTask"));
const NewBoard_1 = __importDefault(require("./BoardModal/NewBoard"));
const EditBoard_1 = __importDefault(require("./BoardModal/EditBoard"));
const NewColumn_1 = __importDefault(require("./BoardModal/NewColumn"));
const DeleteBoard_1 = __importDefault(require("./BoardModal/DeleteBoard"));
const DeleteTask_1 = __importDefault(require("./TaskModal/DeleteTask"));
const TaskDetails_1 = __importDefault(require("./TaskModal/TaskDetails"));
const hooks_1 = require("../../app/hooks");
const Index = () => {
    const { modalType } = (0, hooks_1.useAppSelector)(state => state.modal);
    // const { task } = useAppSelector(state => state.ids)
    return (<>
      {modalType === 'AddTask' && <AddTask_1.default />}
      {modalType === 'EditTask' && <EditTask_1.default />}
      {modalType === 'NewBoard' && <NewBoard_1.default />}
      {modalType === 'EditBoard' && <EditBoard_1.default />}
      {modalType === 'NewColumn' && <NewColumn_1.default />}
      {modalType === 'DeleteBoard' && <DeleteBoard_1.default />}
      {modalType === 'DeleteTask' && <DeleteTask_1.default />}
      {modalType === 'TaskDetails' && <TaskDetails_1.default />}
      
    </>);
};
exports.default = Index;
