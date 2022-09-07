import { createSlice } from "@reduxjs/toolkit"

interface IState {
  boardId: string
  task: any
}

const initialState: IState = {
  boardId: '',
  task: {}
}

export const currentBoardSlice = createSlice({
  name: 'currentBoard',
  initialState,
  reducers: {
    changeBoardId: (state, action) => {
      state.boardId = action.payload
    },
    changeTask: (state, action) => {
      state.task = action.payload
    }
  }

})

export const { changeBoardId, changeTask } = currentBoardSlice.actions
export default currentBoardSlice.reducer

