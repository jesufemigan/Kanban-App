import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import boardService from './boardService'


interface IState {
  board: string[],
  message: string
  isLoading: boolean,
  isError: boolean,
  isSuccess: boolean
}
const initialState: IState = {
  board: [],
  message: '',
  isLoading: false,
  isError: false,
  isSuccess: false
}

export const getAllBoards = createAsyncThunk('board/getAll', async (_, thunkAPI) => {
  try {
    const appState:any = thunkAPI.getState()
    const token = appState.auth.token
    return boardService.getAllBoards(token)
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
          state.board = action.payload
        })
        .addCase(getAllBoards.rejected, (state, action) => {
          state.message = action.payload as string
        })
  },
})

export const { resetBoard } = boardSlice.actions
export default boardSlice.reducer