import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import boardService from './boardService'
import taskService from "./taskService";

import type { RootState } from "../../app/store";

interface IBoard {
  _id: string
  userId: string
  title: string
  columns: IColumn[]
}


interface ISubtask {
  _id: string
  title: string
  isCompleted: boolean
}

interface ITask {
  _id?: string
  title: string
  description: string
  status: string
  subtasks: ISubtask[]
}

interface IColumn {
  _id: string 
  title: string
  tasks: ITask[]
}


export interface IBoardState {
  boards: IBoard[],
  message: string
  isLoading: boolean,
  isError: boolean,
  isSuccess: boolean
}
const initialState: IBoardState = {
  boards: [],
  message: '',
  isLoading: false,
  isError: false,
  isSuccess: false
}

export const getAllBoards = createAsyncThunk('board/getAll', async (_, thunkAPI) => {
  try {
    const appState = thunkAPI.getState() as RootState
    const token = appState.auth.user.token
    return await boardService.getAllBoards(token)
  } catch (error:any) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

export const createNewBoard = createAsyncThunk('board/createNew', async (boardDetails:any, thunkAPI) => {
  try {
    const appState = thunkAPI.getState() as RootState
    const token = appState.auth.user.token
    return await boardService.createNewBoard(token, boardDetails)
  } catch (error:any) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

export const editBoard = createAsyncThunk('board/edit', async (updatedBoardDetails:any, thunkAPI) => {
  try {
    const appState = thunkAPI.getState() as RootState
    const token = appState.auth.user.token
    const boardId = appState.ids.boardId
    return await boardService.editBoard(token, boardId, updatedBoardDetails)
  } catch (error:any) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

export const deleteBoard = createAsyncThunk('board/delete', async (_, thunkAPI) => {
  try {
    const appState = thunkAPI.getState() as RootState
    const token = appState.auth.user.token
    const boardId = appState.ids.boardId
    return await boardService.deleteBoard(token, boardId)

  } catch (error:any) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

export const addNewTask = createAsyncThunk('board/task/createNew', async (taskDetails:any, thunkAPI) => {
  try {
    const appState = thunkAPI.getState() as RootState
    const token = appState.auth.user.token
    const boardId = appState.ids.boardId
    return await taskService.addNewTask(token, boardId, taskDetails)
  } catch (error:any) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

export const editTask = createAsyncThunk('board/task/edit', async (updatedTaskDetails:any, thunkAPI) => {
  try {
    const appState = thunkAPI.getState() as RootState
    const token = appState.auth.user.token
    const boardId = appState.ids.boardId
    return await taskService.editTask(token, boardId, updatedTaskDetails)
  } catch (error:any) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

export const updateSubTask = createAsyncThunk('board/task/subtask/update', async (details:any, thunkAPI) => {
  try {
    const appState = thunkAPI.getState() as RootState
    const token = appState.auth.user.token
    const boardId = appState.ids.boardId
    return await taskService.updateSubTask(token, boardId, details)
  } catch (error:any) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

export const deleteTask = createAsyncThunk('board/task/delete', async(details:any, thunkAPI) => {
  try {
    const appState = thunkAPI.getState() as RootState
    const token = appState.auth.user.token
    const boardId = appState.ids.boardId
    return await taskService.deleteTask(token, boardId, details)
  } catch (error:any) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

export const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {
    resetBoard: (state) => {
      state.isError = false
      state.isLoading = false
      state.isSuccess = false
    }
  },
  extraReducers(builder) {
      builder
        .addCase(getAllBoards.pending, (state) => {
          state.isLoading = true
        })
        .addCase(getAllBoards.fulfilled, (state, action) => {
          state.boards = action.payload
        })
        .addCase(getAllBoards.rejected, (state, action) => {
          state.message = action.payload as string
        })
        .addCase(createNewBoard.pending, (state) => {
          state.isLoading = true
        })
        .addCase(createNewBoard.fulfilled, (state, action) => {
          state.boards = [...state.boards, action.payload]
          state.isLoading = false
          state.isSuccess = true
        })
        .addCase(createNewBoard.rejected, (state, action) => {
          state.isLoading = false
          state.isError = true
          state.message = action.payload as string
        })
        .addCase(editBoard.pending, (state) => {
          state.isLoading = true
        })
        .addCase(editBoard.fulfilled, (state, action) => {
          state.isLoading = false
          state.isSuccess = true
          state.boards = action.payload
        })
        .addCase(editBoard.rejected, (state, action) => {
          state.isLoading = false
          state.isError = true
          state.message = action.payload as string
        })
        .addCase(deleteBoard.pending, (state) => {
          state.isLoading = true
        })
        .addCase(deleteBoard.fulfilled, (state, action) => {
          state.isLoading = false
          state.isSuccess = true
          state.boards = action.payload
        })
        .addCase(deleteBoard.rejected, (state, action) => {
          state.isLoading = false
          state.isError = true
          state.message = action.payload  as string
        })
        .addCase(addNewTask.pending, (state) => {
          state.isLoading = true
        })
        .addCase(addNewTask.fulfilled, (state, action) => {
          state.isLoading = false
          state.isSuccess = true
          state.boards = action.payload
        })
        .addCase(addNewTask.rejected, (state, action) => {
          state.isLoading = false
          state.isError = true
          state.message = action.payload as string
        })
        .addCase(editTask.pending, (state) => {
          state.isLoading = false
        })
        .addCase(editTask.fulfilled, (state, action) => {
          state.isLoading = false
          state.isSuccess = true
          state.boards = action.payload
        })
        .addCase(editTask.rejected, (state, action) => {
          state.isLoading = false
          state.isError = true
          state.message = action.payload as string
        })
        .addCase(updateSubTask.pending, (state) => {
          state.isLoading = true
        })
        .addCase(updateSubTask.fulfilled, (state, action) => {
          state.isLoading = false
          state.isSuccess = true
          state.boards = action.payload
        })
        .addCase(updateSubTask.rejected, (state, action) => {
          state.isLoading = false
          state.isError = true
          state.message = action.payload as string
        })
        .addCase(deleteTask.pending, (state) => {
          state.isLoading = true
        })
        .addCase(deleteTask.fulfilled, (state, action) => {
          state.isLoading = false
          state.isSuccess = true
          state.boards = action.payload
        })
        .addCase(deleteTask.rejected, (state, action) => {
          state.isLoading = false
          state.isError = true
          state.message = action.payload  as string
        })
  },
})

export const { resetBoard } = boardSlice.actions
export default boardSlice.reducer