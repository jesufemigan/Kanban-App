"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Inputs_1 = __importDefault(require("./Inputs"));
const react_google_login_1 = require("react-google-login");
const gapi_script_1 = require("gapi-script");
const logo_mobile_svg_1 = __importDefault(require("../assets/logo-mobile.svg"));
const react_router_dom_1 = require("react-router-dom");
const react_1 = require("react");
const react_2 = require("react");
const hooks_1 = require("../app/hooks");
const authSlice_1 = require("../features/auth/authSlice");
const react_router_dom_2 = require("react-router-dom");
const progressBarReducer_1 = require("../features/progressBarReducer");
const UserForm = ({ name, signUp }) => {
    const { user, isLoading } = (0, hooks_1.useAppSelector)(state => state.auth);
    const [userData, setUserData] = (0, react_2.useState)({
        name: '',
        email: '',
        password: ''
    });
    const handleChange = (e) => {
        setUserData(prevState => (Object.assign(Object.assign({}, prevState), { [e.target.name]: e.target.value })));
    };
    const dispatch = (0, hooks_1.useAppDispatch)();
    const navigate = (0, react_router_dom_2.useNavigate)();
    (0, react_1.useEffect)(() => {
        if (user && user.name) {
            navigate('/');
        }
        if (isLoading) {
            dispatch((0, progressBarReducer_1.setProgress)());
        }
        dispatch((0, authSlice_1.reset)());
    }, [user, navigate, dispatch, isLoading]);
    const clientId = "939999495285-dm64unilovi7uq8ti4pf9p1i1hgd8jqe.apps.googleusercontent.com";
    (0, react_1.useEffect)(() => {
        gapi_script_1.gapi.load("client:auth2", () => {
            gapi_script_1.gapi.auth2.init({ clientId });
        });
    }, []);
    const handleSubmit = (e) => {
        e.preventDefault();
        if (signUp) {
            dispatch((0, authSlice_1.register)(userData));
        }
        else {
            dispatch((0, authSlice_1.login)(userData));
        }
    };
    const googleSuccess = (res) => __awaiter(void 0, void 0, void 0, function* () {
        const user = {
            name: res.profileObj.givenName,
            email: res.profileObj.email,
            token: res.tokenId
        };
        localStorage.setItem('user', JSON.stringify(user));
        dispatch((0, authSlice_1.googleLogin)(user));
        dispatch((0, progressBarReducer_1.setProgress)());
    });
    const googleFailure = (error) => {
        console.log(error);
        console.log('google sign in was unsuccessful');
    };
    return (<div className="userForm">
      <div className="userForm__content">
        <div className="userForm__logo">
          <img src={logo_mobile_svg_1.default} alt=""/>
        </div>
        <form onSubmit={handleSubmit}>
          <h1>{name}</h1>
          {signUp && <Inputs_1.default type="text" name="name" onChange={handleChange}/>}
          <Inputs_1.default name="email" type="email" onChange={handleChange}/>
          <Inputs_1.default name="password" type="password" onChange={handleChange}/>
          <button type="submit" className="btn secondary-btn">{signUp ? 'Sign Up' : 'Login to your account'}</button>
          {!signUp && (<react_google_login_1.GoogleLogin buttonText="Sign in with your google account" clientId={clientId} cookiePolicy="single_host_origin" onSuccess={googleSuccess} onFailure={googleFailure}/>)}
          {signUp ? (<p><strong><react_router_dom_1.Link to='/login'>Sign In</react_router_dom_1.Link></strong> to your account</p>) : (<p>Don't have an account? <strong><react_router_dom_1.Link to='/signup'>Sign Up</react_router_dom_1.Link></strong></p>)}
        </form>
      </div>
    </div>);
};
exports.default = UserForm;
