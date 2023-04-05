import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isSidebarOpen: false
}

const sidebarSlice = createSlice({
  name: "menu",
  initialState,
  reducers: {
    openSidebar: (state) => {
      state.isSidebarOpen = true
    },
    closeSidebar: (state) => {
      state.isSidebarOpen = false
    },
  }
})


export const { openSidebar, closeSidebar } = sidebarSlice.actions
export default sidebarSlice.reducer