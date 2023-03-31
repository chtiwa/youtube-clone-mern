import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { axiosInstance } from '../axios'
import { openMessageModal } from './messageModalSlice'

export const getVideos = createAsyncThunk('videos/getVideos', async (_, { dispatch, rejectWithValue }) => {
  try {
    // dispatch(setLoadingVideos())
    const { data } = await axiosInstance.get('/videos')
    // the data is videos
    return data
  } catch (error) {
    dispatch(openMessageModal({ message: error?.response?.data?.message || "There was an error", success: false }))
    return rejectWithValue({ message: error?.response?.data?.message || "There was an error" })
  }
})

export const createVideo = createAsyncThunk('videos/createVideo', async (form, { dispatch, rejectWithValue }) => {
  try {
    const options = {
      headers: {
        "Content-Type": "multipart/form-data",
      }
    }
    const { data } = await axiosInstance.post('/videos', form, options)
    // the data the created video
    dispatch(openMessageModal({ message: "First step completed", success: true }))
    return data
  } catch (error) {
    dispatch(openMessageModal({ message: error?.response?.data?.message || "There was an error", success: false }))
    return rejectWithValue({ message: error?.response?.data?.message || "There was an error" })
  }
})

export const createVideoNext = createAsyncThunk('videos/createVideoNext', async (params, { dispatch, rejectWithValue }) => {
  try {
    const options = {
      headers: {
        "Content-Type": "multipart/form-data",
      }
    }
    const { data } = await axiosInstance.post(`/videos/next/${params.videoId}`, params.formData, options)
    // the data the created video
    dispatch(openMessageModal({ message: "Video was created successfuly", success: true }))
    return data
  } catch (error) {
    dispatch(openMessageModal({ message: error?.response?.data?.message || "There was an error", success: false }))
    return rejectWithValue({ message: error?.response?.data?.message || "There was an error" })
  }
})

export const getRandomTags = createAsyncThunk('videos/getRandomTags', async (_, { dispatch, rejectWithValue }) => {
  try {
    const { data } = await axiosInstance.get('/videos/tags')
    // the data is the random tags
    return data
  } catch (error) {
    dispatch(openMessageModal({ message: error?.response?.data?.message || "There was an error", success: false }))
    return rejectWithValue({ message: error?.response?.data?.message || "There was an error" })
  }
})

export const getVideosBySubscriptions = createAsyncThunk('videos/getVideosBySubscriptions', async (_, { dispatch, rejectWithValue }) => {
  try {
    const { data } = await axiosInstance.get('/videos/subs')
    // the data is the videos
    return data
  } catch (error) {
    dispatch(openMessageModal({ message: error?.response?.data?.message || "There was an error", success: false }))
    return rejectWithValue({ message: error?.response?.data?.message || "There was an error" })
  }
})

export const getVideosBySearch = createAsyncThunk('videos/getVideosBySearch', async (search, { dispatch, rejectWithValue }) => {
  try {
    const { data } = await axiosInstance.get(`/videos/results?search=${search}`)
    // the data is the videos
    return data
  } catch (error) {
    dispatch(openMessageModal({ message: error?.response?.data?.message || "There was an error", success: false }))
    return rejectWithValue({ message: error?.response?.data?.message || "There was an error" })
  }
})

export const getSearchResults = createAsyncThunk('videos/getSearchResults', async (search, { dispatch, rejectWithValue }) => {
  try {
    const { data } = await axiosInstance.get(`/videos/searchResults?search=${search}`)
    // the data is the videos
    return data
  } catch (error) {
    dispatch(openMessageModal({ message: error?.response?.data?.message || "There was an error", success: false }))
    return rejectWithValue({ message: error?.response?.data?.message || "There was an error" })
  }
})

export const getVideosByTag = createAsyncThunk('videos/getVideosByTag', async (tag, { dispatch, rejectWithValue }) => {
  try {
    const { data } = await axiosInstance.get(`/videos/category?tag=${tag}`)
    // the data is the videos
    return data
  } catch (error) {
    dispatch(openMessageModal({ message: error?.response?.data?.message || "There was an error", success: false }))
    return rejectWithValue({ message: error?.response?.data?.message || "There was an error" })
  }
})

export const getVideosByHistory = createAsyncThunk('videos/getVideosByHistory', async (_, { dispatch, rejectWithValue }) => {
  try {
    const { data } = await axiosInstance.get(`/videos/history`)
    // the data is the videos
    return data
  } catch (error) {
    dispatch(openMessageModal({ message: error?.response?.data?.message || "There was an error", success: false }))
    return rejectWithValue({ message: error?.response?.data?.message || "There was an error" })
  }
})

export const getVideosByChannel = createAsyncThunk('videos/getVideosByChannel', async (channelId, { dispatch, rejectWithValue }) => {
  try {
    const { data } = await axiosInstance.get(`/videos/channel/${channelId}`)
    // the data is the videos
    return data
  } catch (error) {
    dispatch(openMessageModal({ message: error?.response?.data?.message || "There was an error", success: false }))
    return rejectWithValue({ message: error?.response?.data?.message || "There was an error" })
  }
})
export const getTrendingVideos = createAsyncThunk('videos/getTrendingVideos', async (_, { dispatch, rejectWithValue }) => {
  try {
    const { data } = await axiosInstance.get(`/videos/trending`)
    // the data is the videos
    return data
  } catch (error) {
    dispatch(openMessageModal({ message: error?.response?.data?.message || "There was an error", success: false }))
    return rejectWithValue({ message: error?.response?.data?.message || "There was an error" })
  }
})

export const getVideo = createAsyncThunk('videos/getVideo', async (videoId, { dispatch, rejectWithValue }) => {
  try {
    const { data } = await axiosInstance.get(`/videos/${videoId}`)
    // the data is the video
    return data
  } catch (error) {
    dispatch(openMessageModal({ message: error?.response?.data?.message || "There was an error", success: false }))
    return rejectWithValue({ message: error?.response?.data?.message || "There was an error" })
  }
})

export const likeVideo = createAsyncThunk('videos/likeVideo', async (videoId, { dispatch, rejectWithValue }) => {
  try {
    const { data } = await axiosInstance.patch(`/users/like/${videoId}`)
    // the data is the video
    return data
  } catch (error) {
    dispatch(openMessageModal({ message: error?.response?.data?.message || "There was an error", success: false }))
    return rejectWithValue({ message: error?.response?.data?.message || "There was an error" })
  }
})

export const unlikeVideo = createAsyncThunk('videos/unlikeVideo', async (videoId, { dispatch, rejectWithValue }) => {
  try {
    const { data } = await axiosInstance.patch(`/users/unlike/${videoId}`)
    // the data is the video
    return data
  } catch (error) {
    dispatch(openMessageModal({ message: error?.response?.data?.message || "There was an error", success: false }))
    return rejectWithValue({ message: error?.response?.data?.message || "There was an error" })
  }
})

export const dislikeVideo = createAsyncThunk('videos/dislikeVideo', async (videoId, { dispatch, rejectWithValue }) => {
  try {
    const { data } = await axiosInstance.patch(`/users/dislike/${videoId}`)
    // the data is the video

    return data
  } catch (error) {
    dispatch(openMessageModal({ message: error?.response?.data?.message || "There was an error", success: false }))
    return rejectWithValue({ message: error?.response?.data?.message || "There was an error" })
  }
})

export const undislikeVideo = createAsyncThunk('videos/undislikeVideo', async (videoId, { dispatch, rejectWithValue }) => {
  try {
    const { data } = await axiosInstance.patch(`/users/undislike/${videoId}`)
    // the data is the video
    return data
  } catch (error) {
    dispatch(openMessageModal({ message: error?.response?.data?.message || "There was an error", success: false }))
    return rejectWithValue({ message: error?.response?.data?.message || "There was an error" })
  }
})

export const createComment = createAsyncThunk('videos/createComment', async (params, { dispatch, rejectWithValue }) => {
  try {
    console.log(params.form)
    const { data } = await axiosInstance.post(`/comments/${params.videoId}`, params.form)
    // the data is the comment
    return data
  } catch (error) {
    dispatch(openMessageModal({ message: error?.response?.data?.message || "There was an error", success: false }))
    return rejectWithValue({ message: error?.response?.data?.message || "There was an error" })
  }
})

export const getComments = createAsyncThunk('videos/getComments', async (params, { dispatch, rejectWithValue }) => {
  try {
    const { data } = await axiosInstance.get(`/comments/${params.videoId}/${params.filter}`)
    // the data is the comments
    return data
  } catch (error) {
    dispatch(openMessageModal({ message: error?.response?.data?.message || "There was an error", success: false }))
    return rejectWithValue({ message: error?.response?.data?.message || "There was an error" })
  }
})

export const createNestedComment = createAsyncThunk('videos/createNestedComment', async (params, { dispatch, rejectWithValue }) => {
  try {
    const { data } = await axiosInstance.post(`/comments/nested/${params.videoId}/${params.parentId}`, params.form)
    // the data is the nested comment
    return data
  } catch (error) {
    dispatch(openMessageModal({ message: error?.response?.data?.message || "There was an error", success: false }))
    return rejectWithValue({ message: error?.response?.data?.message || "There was an error" })
  }
})

export const getNestedComments = createAsyncThunk('videos/getNestedComments', async (parentId, { dispatch, rejectWithValue }) => {
  try {
    dispatch(setNestedCommentsLoading(parentId))
    const { data } = await axiosInstance.get(`/comments/nested/${parentId}`)
    // the data is the nested comments
    return data
  } catch (error) {
    dispatch(openMessageModal({ message: error?.response?.data?.message || "There was an error", success: false }))
    return rejectWithValue({ message: error?.response?.data?.message || "There was an error" })
  }
})

export const likeComment = createAsyncThunk('videos/likeComment', async (params, { dispatch, rejectWithValue }) => {
  try {
    const { data } = await axiosInstance.patch(`/comments/like/${params.commentId}`, { parentId: params.parentId })
    return data
  } catch (error) {
    dispatch(openMessageModal({ message: error?.response?.data?.message || "There was an error", success: false }))
    return rejectWithValue({ message: error?.response?.data?.message || "There was an error" })
  }
})

export const unlikeComment = createAsyncThunk('videos/unlikeComment', async (params, { dispatch, rejectWithValue }) => {
  try {
    const { data } = await axiosInstance.patch(`/comments/unlike/${params.commentId}`, { parentId: params.parentId })
    // the data is the comment
    return data
  } catch (error) {
    dispatch(openMessageModal({ message: error?.response?.data?.message || "There was an error", success: false }))
    return rejectWithValue({ message: error?.response?.data?.message || "There was an error" })
  }
})

export const dislikeComment = createAsyncThunk('videos/dislikeComment', async (commentId, { dispatch, rejectWithValue }) => {
  try {
    const { data } = await axiosInstance.patch(`/comments/dislike/${commentId}`)
    // the data is the comment
    return data
  } catch (error) {
    dispatch(openMessageModal({ message: error?.response?.data?.message || "There was an error", success: false }))
    return rejectWithValue({ message: error?.response?.data?.message || "There was an error" })
  }
})

export const undislikeComment = createAsyncThunk('videos/undislikeComment', async (commentId, { dispatch, rejectWithValue }) => {
  try {
    const { data } = await axiosInstance.patch(`/comments/undislike/${commentId}`)
    // the data is the comment
    return data
  } catch (error) {
    dispatch(openMessageModal({ message: error?.response?.data?.message || "There was an error", success: false }))
    return rejectWithValue({ message: error?.response?.data?.message || "There was an error" })
  }
})

export const deleteComment = createAsyncThunk('videos/deleteComment', async (params, { dispatch, rejectWithValue }) => {
  try {
    console.log(params.parentId)
    const { data } = await axiosInstance.delete(`/comments/delete/${params.commentId}`, { data: { parentId: params.parentId } })
    // the data is the message
    return data
  } catch (error) {
    dispatch(openMessageModal({ message: error?.response?.data?.message || "There was an error", success: false }))
    return rejectWithValue({ message: error?.response?.data?.message || "There was an error" })
  }
})

const initialState = {
  videos: [],
  video: {},
  tags: [],
  searchResults: [],
  comments: [],
  // once you leave the comment
  nestedComments: [],
  currentNestedComments: [],
  videoId: null,
  // nestedComment inside of the comment state
  videosLoading: true,
  videoLoading: true,
  searchLoading: false,
  nestedCommentsLoading: true,
  createLoading: false,
  tagsLoading: true,
  error: null,
  firstStepCompleted: false,
  secondStepCompleted: false
}

const videosSlice = createSlice({
  name: "videos",
  initialState,
  reducers: {
    setLoadingVideos: (state) => {
      state.loading = true
    },
    setNestedCommentsLoading: (state, action) => {
      // find the parent comment
      let comment = state.comments.find((comment) => comment._id === action.payload)
      comment.nestedCommentsLoading = true
    },
    setSecondStep: (state) => {
      state.secondStepCompleted = false
    }
  },
  extraReducers: {

    [getVideos.pending]: (state) => {
      state.videosLoading = true
    },
    [getVideos.fulfilled]: (state, action) => {
      state.videos = action.payload
      state.videosLoading = false
    },
    [getVideos.rejected]: (state, action) => {
      state.videosLoading = false
      state.error = action.payload
    },
    [createVideo.pending]: (state) => {
      state.createLoading = true
      state.secondStepCompleted = false
    },
    [createVideo.fulfilled]: (state, action) => {
      state.videoId = action.payload._id
      state.createLoading = false
      state.firstStepCompleted = true
    },
    [createVideo.rejected]: (state, action) => {
      state.createLoading = false
      state.error = action.payload
      state.firstStepCompleted = false
    },
    [createVideoNext.pending]: (state) => {
      state.createLoading = true
    },
    [createVideoNext.fulfilled]: (state, action) => {
      state.videos = [...state.videos, action.payload]
      state.createLoading = false
      state.videoId = action.payload._id
      // return to step 1 when entering again
      state.firstStepCompleted = false
      state.secondStepCompleted = true
    },
    [createVideoNext.rejected]: (state, action) => {
      state.createLoading = false
      state.error = action.payload
      state.secondStepCompleted = false
    },
    [getRandomTags.pending]: (state) => {
      state.tagsLoading = true
    },
    [getRandomTags.fulfilled]: (state, action) => {
      state.tags = action.payload
      state.tagsLoading = false
    },
    [getRandomTags.rejected]: (state, action) => {
      state.tagsLoading = false
    },
    [getVideosBySubscriptions.pending]: (state) => {
      state.videosLoading = true
    },
    [getVideosBySubscriptions.fulfilled]: (state, action) => {
      state.videos = action.payload
      state.videosLoading = false
    },
    [getVideosBySubscriptions.rejected]: (state, action) => {
      state.videosLoading = false
      state.error = action.payload
    },
    [getVideosBySearch.pending]: (state) => {
      state.videosLoading = true
    },
    [getVideosBySearch.fulfilled]: (state, action) => {
      state.videos = action.payload
      state.videosLoading = false
    },
    [getVideosBySearch.rejected]: (state, action) => {
      state.videosLoading = false
      state.error = action.payload
    },
    [getSearchResults.pending]: (state) => {
      state.searchLoading = true
    },
    [getSearchResults.fulfilled]: (state, action) => {
      state.searchResults = action.payload
      state.searchLoading = false
    },
    [getSearchResults.rejected]: (state, action) => {
      state.searchLoading = false
      state.error = action.payload
    },
    [getVideosByTag.pending]: (state) => {
      state.videosLoading = true
    },
    [getVideosByTag.fulfilled]: (state, action) => {
      state.videos = action.payload
      state.videosLoading = false
    },
    [getVideosByTag.rejected]: (state, action) => {
      state.videosLoading = false
      state.error = action.payload
    },
    [getTrendingVideos.pending]: (state) => {
      state.videosLoading = true
    },
    [getTrendingVideos.fulfilled]: (state, action) => {
      state.videos = action.payload
      state.videosLoading = false
    },
    [getTrendingVideos.rejected]: (state, action) => {
      state.videosLoading = false
      state.error = action.payload
    },
    [getVideosByHistory.pending]: (state) => {
      state.videosLoading = true
    },
    [getVideosByHistory.fulfilled]: (state, action) => {
      state.videos = action.payload
      state.videosLoading = false
    },
    [getVideosByHistory.rejected]: (state, action) => {
      state.videosLoading = false
      state.error = action.payload
    },
    [getVideosByChannel.pending]: (state) => {
      state.videosLoading = true
    },
    [getVideosByChannel.fulfilled]: (state, action) => {
      state.videos = action.payload
      state.videosLoading = false
    },
    [getVideosByChannel.rejected]: (state, action) => {
      state.videosLoading = false
      state.error = action.payload
    },
    [getVideo.pending]: (state) => {
      state.videoLoading = true
    },
    [getVideo.fulfilled]: (state, action) => {
      state.video = action.payload
      state.videos = state.videos.filter((video) => video._id !== action.payload._id)
      state.videoLoading = false
    },
    [getVideo.rejected]: (state, action) => {
      state.videoLoading = false
      state.error = action.payload
    },
    [likeVideo.pending]: (state) => {
      state.loading = true
    },
    [likeVideo.fulfilled]: (state, action) => {
      state.loading = false
      state.video.likes = action.payload.likes
      state.video.dislikes = action.payload.dislikes
    },
    [likeVideo.rejected]: (state, action) => {
      state.loading = false
      state.error = action.payload
    },
    [unlikeVideo.pending]: (state) => {
      state.loading = true
    },
    [unlikeVideo.fulfilled]: (state, action) => {
      state.loading = false
      state.video.likes = action.payload.likes
      state.video.dislikes = action.payload.dislikes
    },
    [unlikeVideo.rejected]: (state, action) => {
      state.loading = false
      state.error = action.payload
    },
    [dislikeVideo.pending]: (state) => {
      state.loading = true
    },
    [dislikeVideo.fulfilled]: (state, action) => {
      state.loading = false
      state.video.likes = action.payload.likes
      state.video.dislikes = action.payload.dislikes
    },
    [dislikeVideo.rejected]: (state, action) => {
      state.loading = false
      state.error = action.payload
    },
    [undislikeVideo.pending]: (state) => {
      state.loading = true
    },
    [undislikeVideo.fulfilled]: (state, action) => {
      state.loading = false
      state.video.likes = action.payload.likes
      state.video.dislikes = action.payload.dislikes
    },
    [undislikeVideo.rejected]: (state, action) => {
      state.loading = false
      state.error = action.payload
    },
    [createComment.pending]: (state) => {
      // state.commentsLoading = true
    },
    [createComment.fulfilled]: (state, action) => {
      state.commentsLoading = false
      state.comments = [...state.comments, action.payload]

    },
    [createComment.rejected]: (state, action) => {
      state.commentsLoading = false
      state.error = action.payload
    },
    [getComments.pending]: (state) => {
      state.commentsLoading = true
    },
    [getComments.fulfilled]: (state, action) => {
      state.commentsLoading = false
      state.comments = action.payload
    },
    [getComments.rejected]: (state, action) => {
      state.commentsLoading = false
      state.error = action.payload
    },
    [createNestedComment.pending]: (state) => {
      state.nestedCommentsLoading = false
    },
    [createNestedComment.fulfilled]: (state, action) => {
      state.nestedCommentsLoading = false
      // state.comments = state.comments.map((comment) => comment._id === action.payload.parentComment._id ? action.payload.parentComment : comment)
      let comment = state.comments.find((comment) => comment._id === action.payload.parentComment._id)
      comment.nestedCommentsIds = action.payload.parentComment.nestedCommentsIds
      // comment.nestedComments is not iterable
      comment.nestedComments = []
      comment.nestedComments = [...comment.nestedComments, action.payload.nestedComment]
    },
    [createNestedComment.rejected]: (state, action) => {
      state.nestedCommentsLoading = false
      state.error = action.payload
    },
    [getNestedComments.pending]: (state) => {
      state.nestedCommentsLoading = true
    },
    [getNestedComments.fulfilled]: (state, action) => {
      state.nestedCommentsLoading = false
      let comment = state.comments.find((comment) => comment._id === action.payload.commentId)
      comment.nestedComments = [...action.payload.nestedComments]
      comment.nestedCommentsLoading = false
    },
    [getNestedComments.rejected]: (state, action) => {
      state.nestedCommentsLoading = false
      state.error = action.payload
    },
    [likeComment.pending]: (state) => {
      // state.nestedCommentsLoading = false
    },
    [likeComment.fulfilled]: (state, action) => {
      if (action.payload.isNested) {
        // find the parent comment
        let comment = state.comments.find((comment) => comment._id === action.payload.parentId)
        // update the nested comment
        comment.nestedComments = comment.nestedComments.map((nestedComment) => nestedComment._id === action.payload.nestedComment._id ? action.payload.nestedComment : nestedComment)
      } else {
        // update the parent comment
        state.comments = state.comments.map((comment) => comment._id === action.payload.comment._id ? action.payload.comment : comment)
      }
    },
    [likeComment.rejected]: (state, action) => {
      // state.nestedCommentsLoading = false
      state.error = action.payload
    },
    [unlikeComment.pending]: (state) => {
    },
    [unlikeComment.fulfilled]: (state, action) => {
      if (action.payload.isNested) {
        // find the parent comment
        let comment = state.comments.find((comment) => comment._id === action.payload.parentId)
        // update the nested comment
        comment.nestedComments = comment.nestedComments.map((nestedComment) => nestedComment._id === action.payload.nestedComment._id ? action.payload.nestedComment : nestedComment)
      } else {
        // update the parent comment
        state.comments = state.comments.map((comment) => comment._id === action.payload.comment._id ? action.payload.comment : comment)
      }
    },
    [unlikeComment.rejected]: (state, action) => {
      state.error = action.payload
    },
    [dislikeComment.pending]: (state) => {
    },
    [deleteComment.pending]: (state) => {
      state.nestedCommentsLoading = false
    },
    [deleteComment.fulfilled]: (state, action) => {
      if (action.payload.isNested) {
        //  find the parent comment
        let comment = state.comments.find((comment) => comment._id === action.payload.parentComment._id)
        // update the parent comment (nestedCommentsIds)
        comment.nestedCommentsIds = action.payload.parentComment.nestedCommentsIds
        // filter the targeted nested comment
        comment.nestedComments = comment.nestedComments.filter((nestedComment) => nestedComment._id !== action.payload.nestedCommentId)
      } else {
        // delete the parent comment
        state.comments = state.comments.filter((comment) => comment._id !== action.payload.commentId)
      }
    },
    [deleteComment.rejected]: (state, action) => {
      state.nestedCommentsLoading = false
      state.error = action.payload
    },
  }
})

export const { setLoadingVideos, setNestedCommentsLoading, setSecondStep } = videosSlice.actions

export default videosSlice.reducer