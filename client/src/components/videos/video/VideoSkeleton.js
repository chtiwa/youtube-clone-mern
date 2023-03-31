import React, { useState, useEffect } from 'react'
import './video.css'
import { useLocation } from 'react-router-dom'

const Video = () => {
  const location = useLocation()
  const [isResults, setIsResults] = useState(false)
  useEffect(() => {
    if (location.pathname === "/results") {
      setIsResults(true)
    } else {
      setIsResults(false)
    }
  }, [location.pathname])

  return (
    <div className="video" style={{ width: "100%", flexDirection: `${isResults ? "row" : "column"}` }} >
      <div className="video-file skeleton" >
        <video src="" alt="" />
      </div>
      <div className="video-info">
        <div className="video-info-channel-image skeleton">
        </div>
        <div className="video-info-extra">
          <div className="video-info-extra-title skeleton"></div>
          {/* <div className="video-info-extra-channel-name skeleton"></div> */}
          <ul className="video-info-extra-list skeleton"></ul>
        </div>
      </div>
    </div>
  )
}

export default Video