import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  modalType: ""
}

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal: (state, action) => {
      return { ...state, modalType: action.payload }
    },
    closeModal: (state) => {
      return {
        ...state,
        modalType: ""
      }
    }
  }
})

export const { openModal, closeModal } = modalSlice.actions 
export default modalSlice.reducer