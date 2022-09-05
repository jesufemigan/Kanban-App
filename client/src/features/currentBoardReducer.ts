import { createSlice } from "@reduxjs/toolkit"

interface IState {
  id: string
}

const initialState: IState = {
  id: ''
}

export const currentBoardSlice = createSlice({
  name: 'currentBoard',
  initialState,
  reducers: {
    changeBoardId: (state, action) => {
      state.id = action.payload
    }
  }

})

export const { changeBoardId } = currentBoardSlice.actions
export default currentBoardSlice.reducer

