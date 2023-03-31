import React, { useState, useEffect } from 'react'
import "../comments.css"
import { AiFillLike, AiOutlineLike, AiFillDelete } from 'react-icons/ai'
import { useSelector, useDispatch } from 'react-redux'
import { likeComment, deleteComment, unlikeComment } from '../../../features/videosSlice'
import moment from 'moment'

const NestedComment = ({ nestedComment, parentId }) => {
  const dispatch = useDispatch()
  const { isLoggedIn, userId } = useSelector(state => state.users)
  const [hasLikedComment, setHasLikedComment] = useState(false)

  useEffect(() => {
    if (!isLoggedIn) return
    setHasLikedComment(nestedComment?.likes?.includes(userId))
  }, [isLoggedIn, hasLikedComment, nestedComment, userId])

  const handleDeleteComment = () => {
    if (!isLoggedIn) return
    dispatch(deleteComment({ commentId: nestedComment._id, parentId: parentId }))
  }
  const handleLikeComment = () => {
    if (!isLoggedIn) return
    if (hasLikedComment) {
      dispatch(unlikeComment({ commentId: nestedComment._id, parentId: parentId }))
    } else {
      dispatch(likeComment({ commentId: nestedComment._id, parentId: parentId }))
    }
  }

  return (
    <div className="nested-comment">
      <div className="nested-comment">
        {nestedComment?.userImage !== "" ? (
          <img src={nestedComment?.userImage} alt="" />
        ) : (
          <img src="/no-profile.png" alt="" />
        )}
      </div>
      <div className="comment-wrapper-inner">
        <div className="comment-info">
          <div className="comment-info-extra">
            <div className="comment-info-username">{nestedComment.username}</div>
            <div className="comment-info-createdAt">{moment(nestedComment.createdAt).fromNow()}</div>
          </div>
          <div className="comment-value">
            {nestedComment.value}
          </div>
        </div>
        <div className="comment-features">
          <div className="comment-features-like" onClick={handleLikeComment}>
            {hasLikedComment ? (
              <AiFillLike className="comment-features-icon" />
            ) : (
              <AiOutlineLike className="comment-features-icon" />
            )}
            {nestedComment.likes.length} likes
          </div>
          {nestedComment.userId === userId && (
            <div className="comment-features-like" onClick={handleDeleteComment}>
              <AiFillDelete className="comment-features-icon" />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default NestedComment