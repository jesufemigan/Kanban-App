"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_router_dom_1 = require("react-router-dom");
const hooks_1 = require("./app/hooks");
const Main_1 = __importDefault(require("./pages/Main"));
const SignIn_1 = __importDefault(require("./pages/SignIn"));
const SignUp_1 = __importDefault(require("./pages/SignUp"));
const react_top_loading_bar_1 = __importDefault(require("react-top-loading-bar"));
const progressBarReducer_1 = require("./features/progressBarReducer");
function App() {
    const { theme } = (0, hooks_1.useAppSelector)(state => state.theme);
    const { progress } = (0, hooks_1.useAppSelector)(state => state.progress);
    const dispatch = (0, hooks_1.useAppDispatch)();
    return (<div className={`App ${theme}`}>
      <react_top_loading_bar_1.default color='#635FC7' progress={progress} height={4} loaderSpeed={700} onLoaderFinished={() => dispatch((0, progressBarReducer_1.resetProgress)())}/>
      <react_router_dom_1.BrowserRouter>
        <react_router_dom_1.Routes>
          <react_router_dom_1.Route path='/' element={<Main_1.default />}/>
          <react_router_dom_1.Route path='/login' element={<SignIn_1.default />}/>
          <react_router_dom_1.Route path='/signup' element={<SignUp_1.default />}/>
        </react_router_dom_1.Routes>
      </react_router_dom_1.BrowserRouter>
    </div>);
}
exports.default = App;
