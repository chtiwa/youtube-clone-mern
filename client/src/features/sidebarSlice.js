import { createSlice } from '@reduxjs/toolkit'
// import {axiosInstance} from '../axios'
// export const login = createAsyncThunk('auth/login', async (form, { dispatch, rejectWithValue }) => {
//   dispatch(setLoading())
//   try {
//     const { data } = await axiosInstance.post('/auth/login', form)
//     return data
//   } catch (error) {
//     dispatch(openModal({ message: error.response?.data?.message || "There was an error", success: false }))
//     return rejectWithValue({ message: error?.response?.data?.message || 'There was an error' })

//   }
// })

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