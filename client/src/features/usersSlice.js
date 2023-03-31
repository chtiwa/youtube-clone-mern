import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { axiosInstance } from '../axios'
import { openMessageModal } from './messageModalSlice'

export const authenticate = createAsyncThunk('users/authenticate', async (form, { dispatch, rejectWithValue }) => {
  try {
    console.log(form)
    const { data } = await axiosInstance.post('/auth', form)
    return data
  } catch (error) {
    dispatch(openMessageModal({ message: error?.response?.data?.message || "There was an error", success: false }))
    return rejectWithValue({ message: error?.response?.data?.message || "There was an error" })
  }
})

export const logout = createAsyncThunk('users/logout', async (_, { dispatch, rejectWithValue }) => {
  try {
    const { data } = await axiosInstance.get('/auth/logout')
    return data
  } catch (error) {
    dispatch(openMessageModal({ message: error?.response?.data?.message || "There was an error", success: false }))
    return rejectWithValue({ message: error?.response?.data?.message || "There was an error" })
  }
})

export const subscribe = createAsyncThunk('users/subscribe', async (channelId, { dispatch, rejectWithValue }) => {
  try {
    const { data } = await axiosInstance.patch(`/users/sub/${channelId}`)
    // the data is the user's subsriptions
    return data
  } catch (error) {
    dispatch(openMessageModal({ message: error?.response?.data?.message || "There was an error", success: false }))
    return rejectWithValue({ message: error?.response?.data?.message || "There was an error" })
  }
})

export const unsubscribe = createAsyncThunk('users/unsubscribe', async (channelId, { dispatch, rejectWithValue }) => {
  try {
    const { data } = await axiosInstance.patch(`/users/unsub/${channelId}`)
    // the data is the user's subsriptions
    return data
  } catch (error) {
    dispatch(openMessageModal({ message: error?.response?.data?.message || "There was an error", success: false }))
    return rejectWithValue({ message: error?.response?.data?.message || "There was an error" })
  }
})

export const getChannel = createAsyncThunk('users/getchannel', async (channelId, { dispatch, rejectWithValue }) => {
  try {
    const { data } = await axiosInstance.get(`/users/${channelId}`)
    // the data is the channel
    return data
  } catch (error) {
    dispatch(openMessageModal({ message: error?.response?.data?.message || "There was an error", success: false }))
    return rejectWithValue({ message: error?.response?.data?.message || "There was an error" })
  }
})

const initialState = {
  username: "",
  userId: "",
  email: "",
  imageUrl: "",
  tokenId: "",
  theme: "light",
  isLoggedIn: false,
  loading: false,
  error: false,
  channel: {},
  channelLoading: false
}

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setAuth: (state, action) => {
      state.username = action.payload.username
      state.email = action.payload.email
      state.tokenId = action.payload.tokenId
    },
    getTheme: (state) => {
      const theme = `${window?.localStorage?.getItem("theme")}`
      if (["light", "dark"].includes(theme)) {
        state.theme = theme
      } else {
        state.theme = "light"
      }
    },
    setTheme: (state, action) => {
      window.localStorage.setItem("theme", action.payload)
      state.theme = action.payload
    }
  },
  extraReducers: {
    [authenticate.fulfilled]: (state, action) => {
      state.userId = action.payload.user._id
      state.imageUrl = action.payload.user.imageUrl
      state.isLoggedIn = action.payload.isLoggedIn
    },
    [logout.fulfilled]: (state, action) => {
      state.isLoggedIn = action.payload.isLoggedIn
    },
    [subscribe.pending]: (state) => {
      state.loading = false
    },
    [subscribe.fulfilled]: (state, action) => {
      state.loading = false
      state.channel.subscribers = action.payload.subscribers
    },
    [subscribe.rejected]: (state, action) => {
      state.loading = false
      state.error = action.payload
    },
    [unsubscribe.pending]: (state) => {
      state.loading = true
    },
    [unsubscribe.fulfilled]: (state, action) => {
      state.loading = false
      state.channel.subscribers = action.payload.subscribers
    },
    [unsubscribe.rejected]: (state, action) => {
      state.loading = false
      state.error = action.payload
    },
    [getChannel.pending]: (state) => {
      state.channelLoading = true
    },
    [getChannel.fulfilled]: (state, action) => {
      state.channelLoading = false
      state.channel = action.payload
    },
    [getChannel.rejected]: (state, action) => {
      state.channelLoading = false
      state.error = action.payload
    },
  }
})

export const { setAuth, setTheme, getTheme } = usersSlice.actions

export default usersSlice.reducer