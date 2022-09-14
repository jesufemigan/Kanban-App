"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const icon_cross_svg_1 = __importDefault(require("../assets/icon-cross.svg"));
const Inputs = ({ type, name, value, noName, inputArray, onChange, handleRemove, isEmpty, register }) => {
    const handleChange = (e, id) => {
        if (onChange)
            onChange(e, id);
    };
    // const isDuplicatedName = 
    // const { register, formState: { errors } } = useForm();
    return (<div className="input">
      <label htmlFor={name}>{name}</label>
      {inputArray ? (inputArray.map((obj, index) => (<span key={obj._id}>
            <input type={type} name={name} onChange={(e) => handleChange(e, obj._id)} value={obj.title} className={isEmpty === 'yes' ? 'isEmpty' : ''}/>
            {inputArray.length > 1 && (<img src={icon_cross_svg_1.default} alt="" onClick={() => handleRemove(obj._id)}/>)}
          </span>))) : (<input type={type} onChange={(e) => handleChange(e)} name={name} value={value} disabled={noName} className={isEmpty === 'yes' ? 'isEmpty' : ''}/>)}
    </div>);
};
exports.default = Inputs;
