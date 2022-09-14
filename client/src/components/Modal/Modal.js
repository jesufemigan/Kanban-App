"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const icon_cross_svg_1 = __importDefault(require("../../assets/icon-cross.svg"));
const react_redux_1 = require("react-redux");
const modalSlice_1 = require("../../features/modal/modalSlice");
const Modal = ({ children }) => {
    const dispatch = (0, react_redux_1.useDispatch)();
    const handleCloseModal = () => {
        dispatch((0, modalSlice_1.closeModal)());
    };
    return (<div className="modal__overlay" onClick={handleCloseModal}>
      <div className="modal__content" onClick={e => e.stopPropagation()}>
        <img src={icon_cross_svg_1.default} alt="" id="closeModal" onClick={handleCloseModal}/>
        {children}
      </div>
    </div>);
};
exports.default = Modal;
