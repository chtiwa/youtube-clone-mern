import React, { useEffect } from 'react'
import './comments.css'
import Comment from './comment/Comment'
import { getComments } from '../../features/videosSlice'
import { useSelector, useDispatch } from 'react-redux'

const Comments = ({ videoId, filter }) => {
  const dispatch = useDispatch()
  const { comments, commentsLoading } = useSelector(state => state.videos)
  useEffect(() => {
    dispatch(getComments({ videoId: videoId, filter: filter }))
  }, [dispatch, videoId, filter])

  return (
    <div className='comments'>
      {!commentsLoading && comments.length > 0 && comments.map((comment, index) => {
        return (
          <Comment key={index} comment={comment} />
        )
      })}
    </div>
  )
}

export default Comments