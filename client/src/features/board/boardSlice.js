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
exports.resetBoard = exports.boardSlice = exports.deleteTask = exports.updateSubTask = exports.editTask = exports.addNewTask = exports.deleteBoard = exports.editBoard = exports.createNewBoard = exports.getAllBoards = void 0;
const toolkit_1 = require("@reduxjs/toolkit");
const boardService_1 = __importDefault(require("./boardService"));
const taskService_1 = __importDefault(require("./taskService"));
const initialState = {
    boards: [],
    message: '',
    isLoading: false,
    isError: false,
    isSuccess: false
};
exports.getAllBoards = (0, toolkit_1.createAsyncThunk)('board/getAll', (_, thunkAPI) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const appState = thunkAPI.getState();
        const token = appState.auth.user.token;
        return yield boardService_1.default.getAllBoards(token);
    }
    catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
}));
exports.createNewBoard = (0, toolkit_1.createAsyncThunk)('board/createNew', (boardDetails, thunkAPI) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const appState = thunkAPI.getState();
        const token = appState.auth.user.token;
        return yield boardService_1.default.createNewBoard(token, boardDetails);
    }
    catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
}));
exports.editBoard = (0, toolkit_1.createAsyncThunk)('board/edit', (updatedBoardDetails, thunkAPI) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const appState = thunkAPI.getState();
        const token = appState.auth.user.token;
        const boardId = appState.ids.boardId;
        return yield boardService_1.default.editBoard(token, boardId, updatedBoardDetails);
    }
    catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
}));
exports.deleteBoard = (0, toolkit_1.createAsyncThunk)('board/delete', (_, thunkAPI) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const appState = thunkAPI.getState();
        const token = appState.auth.user.token;
        const boardId = appState.ids.boardId;
        return yield boardService_1.default.deleteBoard(token, boardId);
    }
    catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
}));
exports.addNewTask = (0, toolkit_1.createAsyncThunk)('board/task/createNew', (taskDetails, thunkAPI) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const appState = thunkAPI.getState();
        const token = appState.auth.user.token;
        const boardId = appState.ids.boardId;
        return yield taskService_1.default.addNewTask(token, boardId, taskDetails);
    }
    catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
}));
exports.editTask = (0, toolkit_1.createAsyncThunk)('board/task/edit', (updatedTaskDetails, thunkAPI) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const appState = thunkAPI.getState();
        const token = appState.auth.user.token;
        const boardId = appState.ids.boardId;
        return yield taskService_1.default.editTask(token, boardId, updatedTaskDetails);
    }
    catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
}));
exports.updateSubTask = (0, toolkit_1.createAsyncThunk)('board/task/subtask/update', (details, thunkAPI) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const appState = thunkAPI.getState();
        const token = appState.auth.user.token;
        const boardId = appState.ids.boardId;
        return yield taskService_1.default.updateSubTask(token, boardId, details);
    }
    catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
}));
exports.deleteTask = (0, toolkit_1.createAsyncThunk)('board/task/delete', (details, thunkAPI) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const appState = thunkAPI.getState();
        const token = appState.auth.user.token;
        const boardId = appState.ids.boardId;
        return yield taskService_1.default.deleteTask(token, boardId, details);
    }
    catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
}));
exports.boardSlice = (0, toolkit_1.createSlice)({
    name: 'board',
    initialState,
    reducers: {
        resetBoard: (state) => {
            state.isError = false;
            state.isLoading = false;
            state.isSuccess = false;
        }
    },
    extraReducers(builder) {
        builder
            .addCase(exports.getAllBoards.pending, (state) => {
            state.isLoading = true;
        })
            .addCase(exports.getAllBoards.fulfilled, (state, action) => {
            state.boards = action.payload;
        })
            .addCase(exports.getAllBoards.rejected, (state, action) => {
            state.message = action.payload;
        })
            .addCase(exports.createNewBoard.pending, (state) => {
            state.isLoading = true;
        })
            .addCase(exports.createNewBoard.fulfilled, (state, action) => {
            state.boards = [...state.boards, action.payload];
            state.isLoading = false;
            state.isSuccess = true;
        })
            .addCase(exports.createNewBoard.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        })
            .addCase(exports.editBoard.pending, (state) => {
            state.isLoading = true;
        })
            .addCase(exports.editBoard.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.boards = action.payload;
        })
            .addCase(exports.editBoard.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        })
            .addCase(exports.deleteBoard.pending, (state) => {
            state.isLoading = true;
        })
            .addCase(exports.deleteBoard.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.boards = action.payload;
        })
            .addCase(exports.deleteBoard.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        })
            .addCase(exports.addNewTask.pending, (state) => {
            state.isLoading = true;
        })
            .addCase(exports.addNewTask.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.boards = action.payload;
        })
            .addCase(exports.addNewTask.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        })
            .addCase(exports.editTask.pending, (state) => {
            state.isLoading = false;
        })
            .addCase(exports.editTask.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.boards = action.payload;
        })
            .addCase(exports.editTask.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        })
            .addCase(exports.updateSubTask.pending, (state) => {
            state.isLoading = true;
        })
            .addCase(exports.updateSubTask.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.boards = action.payload;
        })
            .addCase(exports.updateSubTask.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        })
            .addCase(exports.deleteTask.pending, (state) => {
            state.isLoading = true;
        })
            .addCase(exports.deleteTask.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.boards = action.payload;
        })
            .addCase(exports.deleteTask.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        });
    },
});
exports.resetBoard = exports.boardSlice.actions.resetBoard;
exports.default = exports.boardSlice.reducer;
