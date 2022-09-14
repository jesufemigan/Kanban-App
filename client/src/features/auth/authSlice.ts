import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import authService from "./authService";
import { IUserData } from "./authService";

const user = localStorage.getItem('user')

const initialState = {
  user: user ? JSON.parse(user) : null,
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: ''
}

export const register = createAsyncThunk('auth/register', async (user: IUserData, thunkAPI) => {
  try {
    return await authService.registerUser(user)
  } catch (error: any) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

export const login = createAsyncThunk('auth/login', async (user: IUserData, thunkAPI) => {
  try {
    return await authService.loginUser(user)
  } catch (error:any) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

export const logout = createAsyncThunk('auth/logout', async () => {
 authService.logout()
})


export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false
      state.isError = false
      state.message = ''
      state.isSuccess = false
    },
    googleLogin: (state, action) => {
      state.user = action.payload
    }
  },
  extraReducers(builder) {
      builder
        .addCase(register.pending, (state) => {
          state.isLoading = true
        })
        .addCase(register.fulfilled, (state, action) => {
          state.isLoading = false
          state.user = action.payload
          state.isSuccess = true
        })
        .addCase(register.rejected, (state, action) => {
          state.isLoading = false
          state.message = action.payload as string
          state.isError = true
        })
        .addCase(login.pending, (state) => {
          state.isLoading = true
        })
        .addCase(login.fulfilled, (state, action) => {
          state.isLoading = false
          state.user = action.payload
          state.isSuccess = true
        })
        .addCase(login.rejected, (state, action) => {
          state.isLoading = false
          state.message = action.payload as string
          state.isError = true
        })
        .addCase(logout.fulfilled, (state) => {
          state.user = null
        })
  },
})

export const { reset, googleLogin } = authSlice.actions
export default authSlice.reducer