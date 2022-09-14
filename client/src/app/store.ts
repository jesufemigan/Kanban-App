import { configureStore } from '@reduxjs/toolkit'
import modalReducer from '../features/modal/modalSlice';
import boardReducer from '../features/board/boardSlice';
import authReducer from '../features/auth/authSlice';
import boardIdReducer from '../features/currentBoardReducer';
import themeReducer from '../features/themeReducer';
import progressBarReducer from '../features/progressBarReducer';
export const store = configureStore({
  reducer: {
    modal: modalReducer,
    auth: authReducer,
    board: boardReducer,
    ids: boardIdReducer,
    theme: themeReducer,
    progress: progressBarReducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch