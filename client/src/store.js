import { configureStore } from '@reduxjs/toolkit'
import logger from 'redux-logger'
import sidebarReducer from './features/sidebarSlice'
import usersReducer from './features/usersSlice'
import messageModaReducer from './features/messageModalSlice'
import videosReducer from './features/videosSlice'

export const store = configureStore({
  reducer: {
    sidebar: sidebarReducer,
    users: usersReducer,
    messageModal: messageModaReducer,
    videos: videosReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger)
})