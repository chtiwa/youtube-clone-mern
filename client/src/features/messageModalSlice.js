import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  isMessageModalOpen: false,
  success: false,
  message: ""
}

const messageModalSlice = createSlice({
  name: "messageModal",
  initialState,
  reducers: {
    openMessageModal: (state, action) => {
      state.isMessageModalOpen = true
      state.message = action.payload.message
      state.success = action.payload.success
    },
    closeMessageModal: (state, action) => {
      state.isMessageModalOpen = false
      state.success = false
      state.message = ""
    }
  }
})

export const { closeMessageModal, openMessageModal } = messageModalSlice.actions

export default messageModalSlice.reducer