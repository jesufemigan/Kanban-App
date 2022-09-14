"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Layout_1 = __importDefault(require("../components/Layout"));
const Modal_1 = __importDefault(require("../components/Modal"));
const boardSlice_1 = require("../features/board/boardSlice");
const authSlice_1 = require("../features/auth/authSlice");
const hooks_1 = require("../app/hooks");
const react_1 = require("react");
const react_router_dom_1 = require("react-router-dom");
const Main = () => {
    const dispatch = (0, hooks_1.useAppDispatch)();
    const navigate = (0, react_router_dom_1.useNavigate)();
    const { user, isLoading } = (0, hooks_1.useAppSelector)(state => state.auth);
    (0, react_1.useEffect)(() => {
        if (!user) {
            navigate('/login');
        }
        if (user && user.name) {
            dispatch((0, boardSlice_1.getAllBoards)());
        }
        dispatch((0, authSlice_1.reset)());
        dispatch((0, boardSlice_1.resetBoard)());
    }, [dispatch, navigate, user, isLoading]);
    return (<>
      <Layout_1.default />
      <Modal_1.default />
    </>);
};
exports.default = Main;
