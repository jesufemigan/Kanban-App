import { configureStore } from '@reduxjs/toolkit'
import modalReducer from '../features/modal/modalSlice';
import boardReducer from '../features/board/boardSlice';
import authReducer from '../features/auth/authSlice';
import boardIdReducer from '../features/currentBoardReducer';
export const store = configureStore({
  reducer: {
    modal: modalReducer,
    auth: authReducer,
    board: boardReducer,
    ids: boardIdReducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch