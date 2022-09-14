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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.googleLogin = exports.reset = exports.authSlice = exports.logout = exports.login = exports.register = void 0;
const toolkit_1 = require("@reduxjs/toolkit");
const authService_1 = __importDefault(require("./authService"));
const user = localStorage.getItem('user');
const initialState = {
    user: user ? JSON.parse(user) : null,
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: ''
};
exports.register = (0, toolkit_1.createAsyncThunk)('auth/register', (user, thunkAPI) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield authService_1.default.registerUser(user);
    }
    catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
}));
exports.login = (0, toolkit_1.createAsyncThunk)('auth/login', (user, thunkAPI) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield authService_1.default.loginUser(user);
    }
    catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
}));
exports.logout = (0, toolkit_1.createAsyncThunk)('auth/logout', () => __awaiter(void 0, void 0, void 0, function* () {
    authService_1.default.logout();
}));
exports.authSlice = (0, toolkit_1.createSlice)({
    name: 'auth',
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoading = false;
            state.isError = false;
            state.message = '';
            state.isSuccess = false;
        },
        googleLogin: (state, action) => {
            state.user = action.payload;
        }
    },
    extraReducers(builder) {
        builder
            .addCase(exports.register.pending, (state) => {
            state.isLoading = true;
        })
            .addCase(exports.register.fulfilled, (state, action) => {
            state.isLoading = false;
            state.user = action.payload;
            state.isSuccess = true;
        })
            .addCase(exports.register.rejected, (state, action) => {
            state.isLoading = false;
            state.message = action.payload;
            state.isError = true;
        })
            .addCase(exports.login.pending, (state) => {
            state.isLoading = true;
        })
            .addCase(exports.login.fulfilled, (state, action) => {
            state.isLoading = false;
            state.user = action.payload;
            state.isSuccess = true;
        })
            .addCase(exports.login.rejected, (state, action) => {
            state.isLoading = false;
            state.message = action.payload;
            state.isError = true;
        })
            .addCase(exports.logout.fulfilled, (state) => {
            state.user = null;
        });
    },
});
_a = exports.authSlice.actions, exports.reset = _a.reset, exports.googleLogin = _a.googleLogin;
exports.default = exports.authSlice.reducer;
