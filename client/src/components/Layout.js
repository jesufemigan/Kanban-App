"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const SideBar_1 = __importDefault(require("./SideBar"));
const logo_light_svg_1 = __importDefault(require("../assets/logo-light.svg"));
const logo_dark_svg_1 = __importDefault(require("../assets/logo-dark.svg"));
const logo_mobile_svg_1 = __importDefault(require("../assets/logo-mobile.svg"));
const icon_add_task_mobile_svg_1 = __importDefault(require("../assets/icon-add-task-mobile.svg"));
const icon_vertical_ellipsis_svg_1 = __importDefault(require("../assets/icon-vertical-ellipsis.svg"));
const icon_show_sidebar_svg_1 = __importDefault(require("../assets/icon-show-sidebar.svg"));
const Column_1 = __importDefault(require("./Column"));
const modalSlice_1 = require("../features/modal/modalSlice");
const react_1 = require("react");
const hooks_1 = require("../app/hooks");
const Layout = () => {
    const dispatch = (0, hooks_1.useAppDispatch)();
    const [isFocused, setIsFocused] = (0, react_1.useState)(false);
    const [isMobile, setIsMobile] = (0, react_1.useState)(false);
    const boardActionRef = (0, react_1.useRef)(null);
    const { boards } = (0, hooks_1.useAppSelector)(state => state.board);
    const { boardId } = (0, hooks_1.useAppSelector)(state => state.ids);
    const { theme } = (0, hooks_1.useAppSelector)(state => state.theme);
    const [hide, setHide] = (0, react_1.useState)(false);
    (0, react_1.useEffect)(() => {
        function handleClickOutside(e) {
            if (boardActionRef.current && !boardActionRef.current.contains(e.target)) {
                setIsFocused(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [boardActionRef]);
    const showDropDown = () => {
        setIsFocused(prev => !prev);
    };
    const currentBoard = boards.find(board => board._id === boardId);
    return (<>
      <header>
        <div className="logo">
          <img src={logo_mobile_svg_1.default} alt="" id="mobileLogo"/>
          <img src={theme === 'light' ? logo_light_svg_1.default : logo_dark_svg_1.default} alt="" id="desktopLogo"/>
        </div>
        <div className="boardTitle">
          <h1>{currentBoard ? (currentBoard === null || currentBoard === void 0 ? void 0 : currentBoard.title) || 'No Board Found' : 'Home'}</h1>
          <span onClick={() => setIsMobile(prev => !prev)} style={{ transform: isMobile ? 'rotate(180deg)' : '' }}>
          <svg width="10" height="7" xmlns="http://www.w3.org/2000/svg"><path stroke="#635FC7" stroke-width="2" fill="none" d="m1 1 4 4 4-4"></path></svg>
          </span>
          <div className={`mobileSideBar ${isMobile && 'show'}`}>
            <SideBar_1.default />
          </div>
        </div>
        {boards.length > 0 && currentBoard && <div className="actionHeader">
          <button onClick={() => dispatch((0, modalSlice_1.openModal)("AddTask"))}>
            <span>
              <img src={icon_add_task_mobile_svg_1.default} alt=""/>
              <p id="addNew">Add new task</p>
            </span>
          </button>
          <div className="boardActions">
            <img src={icon_vertical_ellipsis_svg_1.default} alt="" onClick={() => showDropDown()}/>
            <div className={`boardActions__child ${isFocused ? 'show' : ''}`} ref={boardActionRef}>
              <p onClick={() => {
                dispatch((0, modalSlice_1.openModal)("EditBoard"));
                setIsFocused(false);
            }}>Edit Board</p>
              <p onClick={() => {
                dispatch((0, modalSlice_1.openModal)("DeleteBoard"));
                setIsFocused(false);
            }}>Delete Board</p>
            </div>
          </div>
        </div>}
      </header>
      <main className={`overflow scroll`}>
        <div className="sideBarPos">
          <SideBar_1.default hide={hide} setHide={setHide}/>
        </div>
        {boards.length > 0 && currentBoard ? (<div className={`column__container ${hide ? 'mainHide' : ''}`}>
          {currentBoard === null || currentBoard === void 0 ? void 0 : currentBoard.columns.map(column => (<Column_1.default title={column.title} tasks={column.tasks} key={column._id}/>))}
          <div className="column__new" onClick={() => dispatch((0, modalSlice_1.openModal)("NewColumn"))}>
            <span>
              <h1>+ New Column</h1>
            </span>
          </div>
        </div>) : boards.length === 0 && !currentBoard && (<div className="noBoard">
            <div className="noBoard__container">
              <p>You have no board yet. Create a new board to get started</p>
              <button onClick={() => dispatch((0, modalSlice_1.openModal)("NewBoard"))}>+ Add New Board</button>
            </div>
          </div>)}
        {!currentBoard && boards.length > 0 && (<div className="initialBoard">
            <p>Choose the board you want to see or create a new one</p>
            <button className="btn secondary-btn" onClick={() => dispatch((0, modalSlice_1.openModal)("NewBoard"))}>+ Add New Board</button>
          </div>)}
        {hide && <div className="showSideBar" onClick={() => setHide(prev => !prev)}><img src={icon_show_sidebar_svg_1.default} alt=""/></div>}
      </main>
    </>);
};
exports.default = Layout;
