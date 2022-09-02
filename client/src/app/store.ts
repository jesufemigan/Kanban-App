import { configureStore } from '@reduxjs/toolkit'
import modalReducer from '../features/modal/modalSlice';
import boardReducer from '../features/board/boardSlice';
import authReducer from '../features/auth/authSlice';

import thunkMiddleWare from 'redux-thunk';


export const store = configureStore({
  reducer: {
    modal: modalReducer,
    auth: authReducer,
    board: boardReducer
  }
})