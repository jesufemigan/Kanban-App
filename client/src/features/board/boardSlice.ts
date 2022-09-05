import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
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
  description: string[]
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

export const addNewTask = createAsyncThunk('board/task/createNew', async (taskDetails:any, thunkAPI) => {
  try {
    const appState = thunkAPI.getState() as RootState
    const token = appState.auth.user.token
    const boardId = appState.currentBoardId.id
    return await taskService.addNewTask(token, boardId, taskDetails)
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
  },
})

export const { resetBoard } = boardSlice.actions
export default boardSlice.reducer