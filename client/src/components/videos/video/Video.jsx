import React, { useState, useEffect, useCallback, useMemo } from 'react'
import './video.css'
import { Link } from 'react-router-dom'
import moment from 'moment'

const Video = ({ isWatch, isResults, _id, title, videoUrl, duration, channelName, channelImageUrl, thumbnailUrl, views, createdAt, userId }) => {
  // duration
  const [totalTime, setTotalTime] = useState(0)

  const leadingZeroFormatter = useMemo(() => new Intl.NumberFormat(undefined, {
    minimumIntegerDigits: 2
  }), [])

  const formationDuration = useCallback((time) => {
    const seconds = Math.floor(time % 60)
    const minutes = Math.floor(time / 60) % 60
    const hours = Math.floor(time / 3600)
    if (minutes === 0) {
      return `00:${leadingZeroFormatter.format(seconds)}`
    } else if (hours === 0) {
      return `${minutes}:${leadingZeroFormatter.format(seconds)}`
    } else {
      return `${hours}:${leadingZeroFormatter.format(minutes)}:${leadingZeroFormatter.format(seconds)}`
    }
  }, [leadingZeroFormatter])

  useEffect(() => {
    setTotalTime(formationDuration(duration))
  }, [formationDuration, duration])


  return (
    <div className={`${!isWatch && !isResults && "video"}  ${isWatch && "video-watch"} ${isResults && "video-results"}`}>
      <Link className="video-file" to={`/watch/${_id}`}>
        <div className="video-file-duration">
          {totalTime}
        </div>
        <img src={thumbnailUrl} alt="" />
      </Link>
      <div className={`${isResults ? "video-info-results" : "video-info"}`}>
        {!isResults && (
          <Link to={`/channel/${channelName}`} state={{ channelId: userId }} className="video-info-channel-image">
            <img src={channelImageUrl} alt="" />
          </Link>
        )}
        <div className={`${isResults ? "video-info-extra-results" : "video-info-extra"}`}>
          {isResults ? (
            <>
              <div className="video-info-extra-title-results">{title}</div>
              <ul className="video-info-extra-list-results">
                <li className="video-info-extra-list-item">{views} vues</li>
                <li className="video-info-extra-list-item dot"></li>
                <li className="video-info-extra-list-item">{moment(createdAt).fromNow()}</li>
              </ul>
              <Link to={`/channel/${channelName}`} state={{ channelId: userId }} className="video-info-channel-image-results">
                <img src={channelImageUrl} alt="" />
                <div className="video-info-extra-channel-name-results">{channelName} </div>
              </Link>
            </>
          ) : (
            <>
              <div className="video-info-extra-title"> {title}</div>
              <div className="video-info-extra-channel-name">{channelName} </div>
              <ul className="video-info-extra-list">
                <li className="video-info-extra-list-item">{views} vues</li>
                <li className="video-info-extra-list-item dot"></li>
                <li className="video-info-extra-list-item">{moment(createdAt).fromNow()} </li>
              </ul>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default Video