import { createSlice } from "@reduxjs/toolkit";


interface IState {
  progress: number
}
const initialState: IState = {
  progress: 0
}

export const progressBarSlice =  createSlice({
  name: 'progressBar',
  initialState,
  reducers: {
    setProgress: (state) => {
      state.progress = 100
    },
    resetProgress: (state) => {
      state.progress = 0
    }
  }
})

export const { setProgress, resetProgress } = progressBarSlice.actions
export default progressBarSlice.reducer