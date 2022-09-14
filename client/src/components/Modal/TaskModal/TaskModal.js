"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Modal_1 = __importDefault(require("../Modal"));
const icon_cross_svg_1 = __importDefault(require("../../../assets/icon-cross.svg"));
const react_1 = require("react");
const toolkit_1 = require("@reduxjs/toolkit");
const boardSlice_1 = require("../../../features/board/boardSlice");
const hooks_1 = require("../../../app/hooks");
const modalSlice_1 = require("../../../features/modal/modalSlice");
const react_hook_form_1 = require("react-hook-form");
const progressBarReducer_1 = require("../../../features/progressBarReducer");
const TaskModal = ({ title, buttonName, edit }) => {
    var _a, _b;
    const { boardId, task } = (0, hooks_1.useAppSelector)(state => state.ids);
    const { boards, isLoading } = (0, hooks_1.useAppSelector)(state => state.board);
    const statusRef = (0, react_1.useRef)(null);
    const currentBoard = boards.find(board => board._id === boardId);
    const dispatch = (0, hooks_1.useAppDispatch)();
    (0, react_1.useEffect)(() => {
        if (isLoading) {
            dispatch((0, progressBarReducer_1.setProgress)());
        }
    }, [dispatch, isLoading]);
    const handleCreateNewTask = (data) => {
        const { title, subtasks, description } = data;
        const taskDetails = {
            title,
            description,
            subtasks,
            status: edit ? task.status : statusRef.current !== null && statusRef.current.value,
            task_id: edit && task._id
        };
        if (edit) {
            dispatch((0, boardSlice_1.editTask)(taskDetails));
        }
        else {
            dispatch((0, boardSlice_1.addNewTask)(taskDetails));
        }
        dispatch((0, modalSlice_1.closeModal)());
    };
    const { register, watch, control, formState: { errors }, handleSubmit } = (0, react_hook_form_1.useForm)({
        defaultValues: {
            title: edit ? task.title : '',
            description: edit ? task.description : '',
            subtasks: edit ? task.subtasks : [],
            _id: edit ? task._id : (0, toolkit_1.nanoid)()
        }
    });
    const { fields, append, remove } = (0, react_hook_form_1.useFieldArray)({ control, name: 'subtasks' });
    const watchFieldArray = watch('subtasks');
    const controlledFields = fields.map((field, index) => {
        return Object.assign(Object.assign({}, field), watchFieldArray === null || watchFieldArray === void 0 ? void 0 : watchFieldArray[index]);
    });
    const isDuplicatedName = (name = '') => {
        if (!currentBoard.columns)
            return;
        return !currentBoard.columns.find((column) => column.tasks.find((task) => { var _a; return ((_a = task.title) === null || _a === void 0 ? void 0 : _a.toLowerCase()) === name.toLowerCase(); }));
    };
    const hasDuplicate = (value, index, array) => {
        if (!array)
            return;
        const arr = array.map((i) => i.title);
        if (arr.indexOf(value) !== index) {
            return false;
        }
        return true;
    };
    return (<Modal_1.default>
      <h1>{title}</h1>
        <div className="input">
          <label htmlFor="">Title</label>
          <span className={errors.title && 'isEmpty'}>
            <input type="text" {...register('title', {
        required: true,
        validate: (value) => { if (!edit)
            return isDuplicatedName(value); }
    })}/>
            {((_a = errors.title) === null || _a === void 0 ? void 0 : _a.type) === 'validate' && <p className="input__error">Used</p>}
            {((_b = errors.title) === null || _b === void 0 ? void 0 : _b.type) === 'required' && <p className="input__error">Required</p>}
          </span>
        </div>
        <div>
          <label htmlFor="description">Description</label>
          <textarea {...register('description')}/>
        </div>
        <div className="input">
          <label htmlFor="">Subtasks</label>
          {controlledFields.map((obj, index) => {
            var _a, _b, _c, _d, _e, _f, _g, _h;
            return (<span key={obj._id} className={((_b = (_a = errors.subtasks) === null || _a === void 0 ? void 0 : _a[index]) === null || _b === void 0 ? void 0 : _b.title) && 'isEmpty'}>
            <input defaultValue={obj.title} {...register(`subtasks.${index}.title`, {
                validate: (value) => { if (!edit)
                    return hasDuplicate(value, index, watchFieldArray); },
                required: true
            })}/>
            {controlledFields.length > 0 && (<img src={icon_cross_svg_1.default} alt="" onClick={() => remove(index)}/>)}
            {((_e = (_d = (_c = errors.subtasks) === null || _c === void 0 ? void 0 : _c[index]) === null || _d === void 0 ? void 0 : _d.title) === null || _e === void 0 ? void 0 : _e.type) === 'validate' && <p className="input__error">Used</p>}
            {((_h = (_g = (_f = errors.subtasks) === null || _f === void 0 ? void 0 : _f[index]) === null || _g === void 0 ? void 0 : _g.title) === null || _h === void 0 ? void 0 : _h.type) === 'required' && <p className="input__error">Required</p>}
          </span>);
        })}
        </div>

        <button className="btn primary-btn" onClick={() => append({ title: '' })}>+ Add New Subtask</button>

        <div className="select">
          <label htmlFor="Status">Status</label>
          <select name="Status" id="Status" ref={statusRef}>
            {currentBoard === null || currentBoard === void 0 ? void 0 : currentBoard.columns.map(column => (<option value={column.title} key={column._id}>{column.title}</option>))}
          </select>
        </div>

        <button className="btn secondary-btn" onClick={handleSubmit(handleCreateNewTask)}>{buttonName}</button>
    </Modal_1.default>);
};
exports.default = TaskModal;
