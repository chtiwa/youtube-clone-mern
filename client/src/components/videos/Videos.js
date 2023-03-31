import React, { useEffect, useState } from 'react'
import './videos.css'
import Video from './video/Video'
import VideoSkeleton from './video/VideoSkeleton'
import { useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

const Videos = ({ currentVideoId }) => {
  const { videos, videosLoading } = useSelector(state => state.videos)
  // change the className based on the location
  // / /history /watch
  // fetch the videos on the index page, the history page 
  const location = useLocation()
  const [isWatch, setIsWatch] = useState(false)
  const [isResults, setIsResults] = useState(false)
  const [currentVideos, setCurrentVideos] = useState(videos)
  useEffect(() => {
    if (location.pathname.includes("watch")) {
      setIsWatch(true)
      setCurrentVideos(videos.filter((video) => video._id !== currentVideoId))
    } else if (location.pathname.includes("results")) {
      setIsResults(true)
    } else if (location.pathname.includes("channel")) {
      // the channel is the same as the / route
      // setIsChannel(true)
    } else {
      setIsWatch(false)
      setIsResults(false)
      // setIsChannel(false)
    }
    // console.log(currentVideos)
  }, [location.pathname, currentVideoId, videos])

  if (videosLoading) {
    return (
      <div className={`${isWatch ? "videos-watch" : "videos"} ${isResults && "videos-results"} `}>
        <VideoSkeleton />
        <VideoSkeleton />
        <VideoSkeleton />
        <VideoSkeleton />
        <VideoSkeleton />
        <VideoSkeleton />
        <VideoSkeleton />
        <VideoSkeleton />
        <VideoSkeleton />
        <VideoSkeleton />
        <VideoSkeleton />
        <VideoSkeleton />
        <VideoSkeleton />
        <VideoSkeleton />
        <VideoSkeleton />
        <VideoSkeleton />
      </div>
    )
  }

  if ((!videosLoading && videos.length === 0) || (!videosLoading && videos.length === "")) {
    // console.log(videos.length)
    return <h2 style={{ margin: "3rem auto", width: "100%", textAlign: "center" }} >No videos to be displayed</h2>
  }

  return (
    <div className={`${isWatch ? "videos-watch" : "videos"} ${isResults && "videos-results"}`}>
      {!videosLoading && videos.length > 0 && videos?.map((video, index) => {
        return video?.videoUrl?.length > 0 && (
          <Video isWatch={isWatch} isResults={isResults} key={index} {...video} />
        )
      })}
    </div>
  )
}

export default Videos