"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const icon_dark_theme_svg_1 = __importDefault(require("../assets/icon-dark-theme.svg"));
const icon_light_theme_svg_1 = __importDefault(require("../assets/icon-light-theme.svg"));
const icon_hide_sidebar_svg_1 = __importDefault(require("../assets/icon-hide-sidebar.svg"));
const hooks_1 = require("../app/hooks");
const modalSlice_1 = require("../features/modal/modalSlice");
const currentBoardReducer_1 = require("../features/currentBoardReducer");
const themeReducer_1 = require("../features/themeReducer");
const authSlice_1 = require("../features/auth/authSlice");
const SideBar = ({ hide, setHide }) => {
    const { boards } = (0, hooks_1.useAppSelector)(state => state.board);
    const { boardId } = (0, hooks_1.useAppSelector)(state => state.ids);
    const dispatch = (0, hooks_1.useAppDispatch)();
    return (<div className={`sideBar ${hide ? 'hide' : ''}`}>
      <div className="allBoards">
        <p>All Boards ({boards.length})</p>
        <div className="eachBoard">
          {boards.map(board => (<span className={boardId === board._id ? 'active' : ''} key={board._id} onClick={() => dispatch((0, currentBoardReducer_1.changeBoardId)(board._id))}>
              <svg width="16" height="16" xmlns="http://www.w3.org/2000/svg"><path d="M0 2.889A2.889 2.889 0 0 1 2.889 0H13.11A2.889 2.889 0 0 1 16 2.889V13.11A2.888 2.888 0 0 1 13.111 16H2.89A2.889 2.889 0 0 1 0 13.111V2.89Zm1.333 5.555v4.667c0 .859.697 1.556 1.556 1.556h6.889V8.444H1.333Zm8.445-1.333V1.333h-6.89A1.556 1.556 0 0 0 1.334 2.89V7.11h8.445Zm4.889-1.333H11.11v4.444h3.556V5.778Zm0 5.778H11.11v3.11h2a1.556 1.556 0 0 0 1.556-1.555v-1.555Zm0-7.112V2.89a1.555 1.555 0 0 0-1.556-1.556h-2v3.111h3.556Z" fill="#828FA3"/></svg>
              <p>{board.title}</p>
            </span>))}
        </div>
        <div className="newBoard">
        <svg width="16" height="16" xmlns="http://www.w3.org/2000/svg"><path d="M0 2.889A2.889 2.889 0 0 1 2.889 0H13.11A2.889 2.889 0 0 1 16 2.889V13.11A2.888 2.888 0 0 1 13.111 16H2.89A2.889 2.889 0 0 1 0 13.111V2.89Zm1.333 5.555v4.667c0 .859.697 1.556 1.556 1.556h6.889V8.444H1.333Zm8.445-1.333V1.333h-6.89A1.556 1.556 0 0 0 1.334 2.89V7.11h8.445Zm4.889-1.333H11.11v4.444h3.556V5.778Zm0 5.778H11.11v3.11h2a1.556 1.556 0 0 0 1.556-1.555v-1.555Zm0-7.112V2.89a1.555 1.555 0 0 0-1.556-1.556h-2v3.111h3.556Z" fill="#635FC7"/></svg>
          <span>
            <p onClick={() => dispatch((0, modalSlice_1.openModal)("NewBoard"))}>+ Create New Board</p>
          </span>
        </div>
      </div>
      <div className="sideBar__footer">
        <div className="themeToggler">
          <img src={icon_dark_theme_svg_1.default} alt=""/>
          <div className="themeToggler__input">
            <label className='switch'>
              <input type="checkbox" onChange={() => dispatch((0, themeReducer_1.changeTheme)())}/>
              <span className='slider round'></span>
            </label>
          </div>
          <img src={icon_light_theme_svg_1.default} alt=""/>
        </div>
        <div className="logout-btn">
          <button className='btn secondary-btn' onClick={() => dispatch((0, authSlice_1.logout)())}>Logout</button>
        </div>
        <div className="sideBarAction" onClick={() => { if (setHide)
        setHide(prev => !prev); }}>
          <img src={icon_hide_sidebar_svg_1.default} alt=""/>
          <p>Hide Sidebar</p>
        </div>
      </div>
    </div>);
};
exports.default = SideBar;
