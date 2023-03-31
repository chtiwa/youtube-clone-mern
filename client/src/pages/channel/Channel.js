import React, { useEffect, useState } from 'react'
import './channel.css'
import Loader from '../../components/loader/Loader'
import Videos from '../../components/videos/Videos'
import { getVideosByChannel } from '../../features/videosSlice'
import { getChannel, subscribe, unsubscribe } from '../../features/usersSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'

const Channel = () => {
  const location = useLocation()
  const dispatch = useDispatch()
  const { channel, channelLoading, isLoggedIn, userId } = useSelector(state => state.users)
  const { videosLoading } = useSelector(state => state.videos)
  const [hasSubscribed, setHasSubscribed] = useState(false)

  useEffect(() => {
    dispatch(getChannel(location?.state?.channelId))
    dispatch(getVideosByChannel(location?.state?.channelId))
  }, [dispatch, location.state])

  useEffect(() => {
    if (!isLoggedIn) return
    setHasSubscribed(channel?.subscribers?.includes(userId))
  }, [channel.subscribers, userId, isLoggedIn])

  const handleSubscribe = () => {
    if (!isLoggedIn) return
    if (hasSubscribed) {
      dispatch(unsubscribe(channel?._id))
    } else {
      dispatch(subscribe(channel?._id))
    }
  }

  if (channelLoading || videosLoading) {
    return (
      <Loader />
    )
  }

  return !channelLoading && !videosLoading && (
    <div className="channel">
      <div className="channel-info">
        <div className="channel-info-cover-pic">
          {channel.imageUrl !== "" ? (
            <img src={channel?.imageUrl} alt="" />
          ) : (
            <img src="/no-profile.png" alt="" />
          )}
        </div>
        <div className="channel-info-wrapper">
          <div className="channel-info-extra-wrapper">
            {channel.imageUrl !== "" ? (
              <img src={channel?.imageUrl} alt="" />
            ) : (
              <img src="/no-profile.png" alt="" />
            )}
            <div className="channel-info-extra-inner">
              <div className="channel-info-extra-inner-name">{channel?.username}</div>
              <div className="channel-info-extra-inner-subs">{channel?.subscribers?.length} subsribers</div>
            </div>
          </div>
          <div className="channel-info-extra-wrapper">
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
      </div>
      <div className="channel-videos">
        <Videos />
      </div>
    </div>
  )
}

export default Channel