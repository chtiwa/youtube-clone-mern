import React, { useEffect, useState } from 'react'
import './watch.css'
import Videos from '../../components/videos/Videos'
import VideoPlayer from '../../components/videoPlayer/VideoPlayer'
import Share from '../../components/share/Share'
import { Link } from 'react-router-dom'
import { AiFillDislike, AiFillLike, AiOutlineShareAlt, AiOutlineDislike, AiOutlineLike } from 'react-icons/ai'
import { MdOutlineKeyboardArrowDown, MdOutlineKeyboardArrowUp } from 'react-icons/md'
import { GoSettings } from 'react-icons/go'
import Comments from '../../components/comments/Comments'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { getVideo, getVideos, likeVideo, dislikeVideo, unlikeVideo, undislikeVideo, setSecondStep } from '../../features/videosSlice'
import { getChannel, subscribe, unsubscribe } from '../../features/usersSlice'
import { createComment } from '../../features/videosSlice'
import moment from 'moment'

const Watch = () => {
  const { id } = useParams()
  const url = `http://localhost:3000/watch/${id}`
  const dispatch = useDispatch()
  const { video, videoLoading, comments, commentsLoading, secondStepCompleted } = useSelector(state => state.videos)
  const { channel, userId, imageUrl, isLoggedIn, theme } = useSelector(state => state.users)
  const [isFullScreen, setIsFullScreen] = useState(false)
  const [isKeyControlActive, setIsKeyControlActive] = useState(false)
  const [showComments, setShowComments] = useState(false)
  const [showDesc, setShowDesc] = useState(false)
  const [showFeatures, setShowFeatures] = useState(false)
  const [comment, setComment] = useState('')
  const [hasLikedVideo, setHaslikedVideo] = useState(false)
  const [hasDislikedVideo, setHasDislikedVideo] = useState(false)
  const [hasSubscribed, setHasSubscribed] = useState(false)
  const [filter, setFilter] = useState("mostRecent")
  const [showCommentSettings, setShowCommentSettings] = useState(false)
  const [showShare, setShowShare] = useState(false)

  useEffect(() => {
    if (secondStepCompleted) {
      dispatch(setSecondStep())
    }
  }, [dispatch, secondStepCompleted])

  useEffect(() => {
    dispatch(getVideo(id))
  }, [dispatch, id])

  useEffect(() => {
    dispatch(getVideos())
  }, [dispatch])

  useEffect(() => {
    // to check the subs
    dispatch(getChannel(video?.userId))
  }, [dispatch, video.userId])

  useEffect(() => {
    setHaslikedVideo(video?.likes?.includes(userId))
    // video.userId is the channel Id
    if (!hasLikedVideo) {
      setHasDislikedVideo(video?.dislikes?.includes(userId))
    }
  }, [video.likes, userId, video.dislikes, hasLikedVideo])

  useEffect(() => {
    setHasSubscribed(channel?.subscribers?.includes(userId))
  }, [channel.subscribers, userId])

  const handleChange = ({ target }) => {
    setComment(target.value)
  }

  const handleCloseInput = () => {
    setComment("")
    setShowFeatures(false)
  }

  const handleAddComment = () => {
    if (comment.length > 2) {
      const form = { value: comment }
      dispatch(createComment({ videoId: id, form: form }))
      setComment("")
      setShowFeatures(false)
    }
  }

  const handleLike = () => {
    if (!isLoggedIn) return
    if (hasLikedVideo) {
      dispatch(unlikeVideo(id))
    } else {
      dispatch(likeVideo(id))
    }
  }
  const handleDislike = () => {
    if (!isLoggedIn) return
    if (hasDislikedVideo) {
      dispatch(undislikeVideo(id))
    } else {
      dispatch(dislikeVideo(id))
    }
  }

  const handleSubscribe = () => {
    if (!isLoggedIn) return
    if (hasSubscribed) {
      dispatch(unsubscribe(video.userId))
    } else {
      dispatch(subscribe(video.userId))
    }
  }

  const handleClickCommentFilter = (filter) => {
    setFilter(filter)
    setShowCommentSettings(showCommentSettings => !showCommentSettings)
  }

  const handleClickCommentSettings = () => {
    setShowCommentSettings(showCommentSettings => !showCommentSettings)
  }

  let props = { isFullScreen, setIsFullScreen, isKeyControlActive, setIsKeyControlActive, videoUrl: video?.videoUrl }

  return !videoLoading && (
    <div className={`watch ${isFullScreen ? "watch-fullscreen" : ""}`} data-theme={`${theme}`}>
      <div className={`${isFullScreen ? "watch-video-fullscreen" : "watch-video"}`}>
        <VideoPlayer {...props} />
        <div className="watch-video-wrapper">
          <div className="watch-video-title" >
            {video?.title}
          </div>
          <div className="watch-video-info">
            <div className="watch-video-info-vues">
              {video?.views} vues
            </div>
            <div className="watch-video-info-dot"></div>
            <div className="watch-video-info-createdAt">
              {moment(video?.createdAt).fromNow()}
            </div>
            <div className="watch-video-info-tags">
              {video?.tags?.map((tag, index) => (
                <div key={index}>#{tag} &nbsp;</div>
              ))}
            </div>
          </div>
          <div className="watch-video-features">
            <div className="watch-video-like">
              {hasLikedVideo ? (
                <AiFillLike className="watch-video-icon" onClick={handleLike} />
              ) : (
                <AiOutlineLike className="watch-video-icon" onClick={handleLike} />
              )}
              {video?.likes?.length} likes
            </div>
            <div className="watch-video-dislike">
              {hasDislikedVideo ? (
                <AiFillDislike className="watch-video-icon" onClick={handleDislike} />
              ) : (
                <AiOutlineDislike className="watch-video-icon" onClick={handleDislike} />
              )}
              Dislike
            </div>
            <div className="watch-video-share" onClick={() => setShowShare(true)} onMouseLeave={() => setShowShare(false)} >
              <AiOutlineShareAlt className="watch-video-icon" />
              Share
              <Share showShare={showShare} setShowShare={setShowShare} url={url} />
            </div>
          </div>
        </div>
        <div className="watch-hr"></div>
        <div className="video-watch-channel">
          <Link to={`/channel/${video?.channelName}`} state={{ channelId: video?.userId }} className="video-watch-channel-image">
            {video?.channelImageUrl !== "" ? (
              <img src={video?.channelImageUrl} alt="" />
            ) : (
              <img src="/no-profile.png" alt="" />
            )}
          </Link>
          <div className="video-watch-channel-wrapper">
            <div className="video-watch-channel-wrapper-inner">
              <div className="video-watch-channel-name">{video?.channelName}</div>
              <div className="video-watch-channel-subs">{channel?.subscribers?.length} subscribers</div>
            </div>
            {((channel?._id !== userId) || (userId.length === 0)) && (
              <div className="video-watch-channel-wrapper-inner">
                {hasSubscribed ? (
                  <p className="video-watch-channel-sub unsub-color" onClick={handleSubscribe} >UNSUBSCRIBE</p>
                ) : (
                  <p className="video-watch-channel-sub" onClick={handleSubscribe} >SUBSCRIBE</p>
                )}
              </div>
            )}
          </div>
        </div>
        <div className="watch-video-description-show">
          {!showDesc ? (
            <>{video?.description?.slice(0, Math.floor(video?.description?.length / 3))}... <p onClick={() => setShowDesc(showDesc => !showDesc)}>More</p></>
          ) : (
            <>{video?.description} <p onClick={() => setShowDesc(showDesc => !showDesc)}>Less</p></>
          )}
        </div>
        <div className="watch-hr"></div>
        <div className="watch-video-comments-count" onClick={() => setShowComments(showComments => !showComments)}>
          Comments {!commentsLoading && comments?.length}
          {showComments ? (
            <>
              hide comments
              <MdOutlineKeyboardArrowUp className="watch-video-icon" />
            </>
          ) : (
            <>
              show comments
              <MdOutlineKeyboardArrowDown className="watch-video-icon" />
            </>
          )}
        </div>
        <div className="watch-video-comment-input" >
          <div className="watch-video-comment-input-wrapper">
            {imageUrl !== "" ? (
              <img src={imageUrl} alt="" className="commenter-profile-picture" />
            ) : (
              <img src="/no-profile.png" alt="" className="commenter-profile-picture" />
            )}
            <input type="text" placeholder='add a comment' onClick={() => setShowFeatures(true)} value={comment || ''} onChange={handleChange} />
            <div className="watch-video-comment-filter" onMouseLeave={() => setShowCommentSettings(false)}>
              <GoSettings className="watch-video-comment-filter-icon" onClick={handleClickCommentSettings} />
              <ul className={`${showCommentSettings ? "watch-video-comment-filter-list-show" : "watch-video-comment-filter-list-hide"}`} data-theme={`${theme}`}>
                <li className="watch-video-comment-filter-item" onClick={() => handleClickCommentFilter("mostRecent")} >Most recent</li>
                <li className="watch-video-comment-filter-item" onClick={() => handleClickCommentFilter("mostLiked")}>Most liked</li>
              </ul>
            </div>
          </div>
          <div className={`${showFeatures ? "watch-video-comment-input-features-show" : "watch-video-comment-input-features-hide"}`}>
            <button className={`${comment.length > 2 && "video-watch-comment-close"}`} onClick={handleCloseInput}  >CLOSE</button>
            <button className={`${comment.length > 2 && "video-watch-comment-add"}`} onClick={handleAddComment} >ADD A COMMENT</button>
          </div>
        </div>
        <div className={`${showComments ? "watch-video-comments-show" : "watch-video-comments-hide"}`}>
          <Comments videoId={video?._id} filter={filter} />
        </div>
      </div>
      <div className={`${isFullScreen ? "watch-videos-fullscreen" : "watch-videos"}`} >
        <Videos currentVideoId={id} />
      </div >
    </div >
  )
}

export default Watch