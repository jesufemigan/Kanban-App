"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Modal_1 = __importDefault(require("../Modal"));
const icon_cross_svg_1 = __importDefault(require("../../../assets/icon-cross.svg"));
const toolkit_1 = require("@reduxjs/toolkit");
const react_hook_form_1 = require("react-hook-form");
const hooks_1 = require("../../../app/hooks");
const boardSlice_1 = require("../../../features/board/boardSlice");
const modalSlice_1 = require("../../../features/modal/modalSlice");
const progressBarReducer_1 = require("../../../features/progressBarReducer");
const react_1 = require("react");
const BoardModal = ({ title, buttonName, edit, noName }) => {
    var _a, _b;
    const { boardId } = (0, hooks_1.useAppSelector)(state => state.ids);
    const { boards, isLoading } = (0, hooks_1.useAppSelector)(state => state.board);
    const currentBoard = boards.find(board => board._id === boardId);
    const dispatch = (0, hooks_1.useAppDispatch)();
    (0, react_1.useEffect)(() => {
        if (isLoading) {
            dispatch((0, progressBarReducer_1.setProgress)());
        }
    }, [isLoading, dispatch]);
    const handleBoard = (data) => {
        const { title, columns } = data;
        const boardDetails = {
            title,
            columns
        };
        if (edit) {
            dispatch((0, boardSlice_1.editBoard)(boardDetails));
        }
        else {
            dispatch((0, boardSlice_1.createNewBoard)(boardDetails));
        }
        dispatch((0, modalSlice_1.closeModal)());
    };
    const { register, watch, control, formState: { errors }, handleSubmit } = (0, react_hook_form_1.useForm)({
        defaultValues: {
            title: edit ? currentBoard === null || currentBoard === void 0 ? void 0 : currentBoard.title : '',
            columns: edit ? currentBoard === null || currentBoard === void 0 ? void 0 : currentBoard.columns : [{ title: '' }],
            _id: edit ? currentBoard === null || currentBoard === void 0 ? void 0 : currentBoard._id : (0, toolkit_1.nanoid)()
        }
    });
    const { fields, append, remove } = (0, react_hook_form_1.useFieldArray)({ control, name: 'columns' });
    const watchFieldArray = watch('columns');
    const controlledFields = fields.map((field, index) => {
        return Object.assign(Object.assign({}, field), watchFieldArray === null || watchFieldArray === void 0 ? void 0 : watchFieldArray[index]);
    });
    const isDuplicateTitle = (value) => !boards.find(board => board.title.toLowerCase() === (value === null || value === void 0 ? void 0 : value.toLowerCase()));
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
        <label htmlFor="">Name</label>
        <span className={errors.title && 'isEmpty'}>
          <input type="text" {...register('title', {
        required: true,
        validate: (value) => { if (!edit)
            return isDuplicateTitle(value); }
    })} disabled={noName} className={noName ? 'disable' : ''}/>
            {((_a = errors.title) === null || _a === void 0 ? void 0 : _a.type) === 'required' && <p className="input__error">Required</p>}
            {((_b = errors.columns) === null || _b === void 0 ? void 0 : _b.type) === 'validate' && <p className="input__error">Used</p>}
        </span>
      </div>
      <div className="input">
          <label htmlFor="">Columns</label>
          {controlledFields.map((obj, index) => {
            var _a, _b, _c, _d, _e, _f, _g, _h;
            return (<span key={obj._id} className={((_b = (_a = errors.columns) === null || _a === void 0 ? void 0 : _a[index]) === null || _b === void 0 ? void 0 : _b.title) && 'isEmpty'}>
              <input defaultValue={obj.title} {...register(`columns.${index}.title`, {
                validate: (value) => { if (!edit)
                    return hasDuplicate(value, index, watchFieldArray); },
                required: true
            })}/>
              {((_e = (_d = (_c = errors.columns) === null || _c === void 0 ? void 0 : _c[index]) === null || _d === void 0 ? void 0 : _d.title) === null || _e === void 0 ? void 0 : _e.type) === 'validate' && <p className="input__error">Used</p>}
              {((_h = (_g = (_f = errors.columns) === null || _f === void 0 ? void 0 : _f[index]) === null || _g === void 0 ? void 0 : _g.title) === null || _h === void 0 ? void 0 : _h.type) === 'required' && <p className="input__error">Required</p>}
            {controlledFields.length > 1 && (<img src={icon_cross_svg_1.default} alt="" onClick={() => remove(index)}/>)}
          </span>);
        })}
        </div>



      <button className="btn primary-btn" onClick={() => append({ title: '' })}>+ Add New Column</button>
      <button className="btn secondary-btn" onClick={handleSubmit(handleBoard)}>{buttonName}</button>
    </Modal_1.default>);
};
exports.default = BoardModal;
