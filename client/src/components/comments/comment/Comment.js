import React, { useState, useRef, useEffect } from 'react'
import '../comments.css'
import { AiFillLike, AiOutlineLike, AiFillDelete } from 'react-icons/ai'
import { MdOutlineKeyboardArrowDown, MdOutlineKeyboardArrowUp, MdOutlineComment } from 'react-icons/md'
import NestedComment from './NestedComment'
import Loader from '../../loader/Loader'
import { useSelector, useDispatch } from 'react-redux'
import { likeComment, unlikeComment, deleteComment, createNestedComment, getNestedComments } from '../../../features/videosSlice'
import moment from 'moment'

const Comment = ({ comment }) => {
  const dispatch = useDispatch()
  const commentRef = useRef()
  const { imageUrl, userId, isLoggedIn } = useSelector(state => state.users)
  // const { nestedCommentsLoading, nestedComments, currentNestedComments } = useSelector(state => state.videos)
  const [showNestedComments, setShowNestedComments] = useState(false)
  const [showReplyInput, setShowReplyInput] = useState(false)
  const [reply, setReply] = useState("")
  const [showFeatures, setShowFeatures] = useState(false)
  const [hasLikedComment, setHasLikedComment] = useState(false)

  useEffect(() => {
    if (!isLoggedIn) return
    setHasLikedComment(comment?.likes?.includes(userId))
  }, [isLoggedIn, hasLikedComment, comment, userId])

  const handleChange = (e) => {
    setReply(e.target.value)
  }

  const handleCloseInput = () => {
    setReply("")
    setShowFeatures(false)
    setShowReplyInput(false)
  }

  const handleShowReplyInput = () => {
    setShowReplyInput(true)
    setShowFeatures(true)
    commentRef.current.focus()
  }

  const handleCommentReply = () => {
    if (reply.length >= 2) {
      const form = { value: reply }
      dispatch(createNestedComment({ videoId: comment.videoId, parentId: comment._id, form: form }))
      setShowReplyInput(false)
      setShowFeatures(false)
      setReply("")
    }
  }

  const handleLikeComment = () => {
    if (!isLoggedIn) return
    if (hasLikedComment) {
      dispatch(unlikeComment({ commentId: comment._id }))
    } else {
      dispatch(likeComment({ commentId: comment._id }))
    }
  }

  const handleDeleteComment = () => {
    dispatch(deleteComment({ commentId: comment._id }))
  }

  const handleShowNestedComments = () => {
    dispatch(getNestedComments(comment._id))
    setShowNestedComments(showNestedComments => !showNestedComments)
  }

  return (
    <div className="comment" >
      <div className="comment-wrapper">
        <div className="comment-image">
          {comment?.userImage !== "" ? (
            <img src={comment?.userImage} alt="" />
          ) : (
            <img src="/no-profile.png" alt="" />
          )}
        </div>
        <div className="comment-wrapper-inner">
          <div className="comment-info">
            <div className="comment-info-extra">
              <div className="comment-info-username">{comment?.username}</div>
              <div className="comment-info-createdAt">{moment(comment?.createdAt).fromNow()}</div>
            </div>
            <div className="comment-value">
              {comment?.value}
            </div>
          </div>
          <div className="comment-features">
            <div className="comment-features-like">
              {hasLikedComment ? (
                <AiFillLike className="comment-features-icon" onClick={handleLikeComment} />
              ) : (
                <AiOutlineLike className="comment-features-icon" onClick={handleLikeComment} />
              )}
              {comment?.likes?.length} Likes
            </div>
            <div className="comment-features-comment">
              <MdOutlineComment className="comment-features-icon comment-icon" onClick={handleShowReplyInput} />
            </div>
            {comment?.userId === userId && (
              <div className="comment-features-comment" >
                <AiFillDelete className="comment-features-icon comment-icon" onClick={handleDeleteComment} />
              </div>
            )}
          </div>
          {comment?.nestedCommentsIds?.length > 0 && (
            <span className="comment-comments" onClick={handleShowNestedComments} >
              {comment?.nestedCommentsIds?.length} Replies
              {showNestedComments ? (
                <MdOutlineKeyboardArrowUp className="comment-comments-icon" />
              ) : (
                <MdOutlineKeyboardArrowDown className="comment-comments-icon" />
              )}
            </span>
          )}
        </div>
      </div>
      {showNestedComments && comment.nestedComments?.length > 0 && comment.nestedComments?.map((nestedComment, index) => {
        return (
          <NestedComment key={index} nestedComment={nestedComment} parentId={comment._id} />
        )
      })}
      {showNestedComments && comment?.nestedCommentIds?.length > 0 && comment?.nestedCommentsLoading && (
        <Loader />
      )}
      <div className={`${showReplyInput ? "video-comment-input" : "video-comment-input-hide"}`} >
        <div className="video-comment-input-wrapper">
          <img src={imageUrl} alt="" className="commenter-profile-picture" />
          <input type="text" placeholder='add a reply' value={reply || ''} onChange={handleChange} ref={commentRef} />
        </div>
        <div className={`${showFeatures ? "video-comment-input-features-show" : "video-comment-input-features-hide"}`}>
          <button className={`${reply.length > 0 && "video-comment-close"}`} onClick={handleCloseInput}  >CLOSE</button>
          <button className={`${reply.length > 0 && "video-comment-add"}`} onClick={handleCommentReply} >ADD A COMMENT</button>
        </div>
      </div>
    </div>
  )
}

export default Comment