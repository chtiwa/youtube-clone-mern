import React, { useState, useRef, useEffect, useCallback } from 'react'
import './videoPlayer.css'
import { MdPlayArrow, MdPause, MdFullscreen, MdFullscreenExit, MdVolumeOff, MdVolumeUp, MdVolumeMute, MdVolumeDown } from 'react-icons/md'
import { current } from '@reduxjs/toolkit'

const VideoPlayer = ({ isFullScreen, setIsFullScreen, isKeyControlActive, setIsKeyControlActive, videoUrl }) => {
  // Layout style
  const videoRef = useRef()
  const timelineContainerRef = useRef()
  const videoContainer = document.getElementById('video-container')

  const [isKey, setIsKey] = useState("")
  // const [isKeyControlActive, setIsKeyControlActive] = useState(true)
  // const [isFullScreen, setIsFullScreen] = useState(false)
  const [isPlay, setIsPlay] = useState(false)
  const [isPause, setIsPause] = useState(true)
  const [isVolume, setIsVolume] = useState("high")
  const [isPlayBackRate, setIsPlayBackRate] = useState(1)
  const [isShowSpeed, setIsShowSpeed] = useState(false)
  const [totalTime, setTotalTime] = useState("0:00")
  const [currentTime, setCurrentTime] = useState("0:00")
  const [isScrubbing, setIsScrubbing] = useState(false)
  const [wasPaused, setWasPaused] = useState(false)

  const handleClickVideo = useCallback(() => {
    if (isPause) {
      videoRef.current.play()
    } else {
      videoRef.current.pause()
    }
  }, [isPause])

  const handleVideoPlay = () => {
    setIsPlay(true)
    setIsPause(false)
  }
  const handleVideoPause = () => {
    setIsPlay(false)
    setIsPause(true)
  }

  const handleFullScreen = useCallback(() => {
    setIsFullScreen(true)
  }, [setIsFullScreen])
  const handleFullScreenExit = useCallback(() => {
    setIsFullScreen(false)
  }, [setIsFullScreen])

  const handleKeyDown = useCallback((e) => {
    switch (e.key) {
      case "k":
        handleClickVideo()
        break
      case " ":
        handleClickVideo()
        break
      case "f":
        handleFullScreen()
        break
      case "Escape":
        handleFullScreenExit()
        break
      case "m":
        if (isVolume === "muted") {
          videoRef.current.volume = 1
          setIsVolume("high")
        } else {
          videoRef.current.volume = 0
          setIsVolume("muted")
        }
        break
      case "ArrowLeft":
        skip(-5)
        break
      case "ArrowRight":
        skip(5)
        break
      default: return
    }
  }, [handleClickVideo, handleFullScreen, handleFullScreenExit, isVolume])

  useEffect(() => {
    // console.log("keydown")
    if (!isKeyControlActive) return
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handleKeyDown, videoContainer, isKeyControlActive])


  const handleVolumeSliderChange = ({ target }) => {
    // console.log(target.value)
    if (target.value === "0") {
      setIsVolume("muted")
    } else if (target.value > 0 && target.value < 0.5) {
      setIsVolume("low")
    } else {
      setIsVolume("high")
    }
    videoRef.current.volume = target.value
  }

  const handleRateChange = (speed) => {
    setIsPlayBackRate(speed)
    setIsShowSpeed(false)
    videoRef.current.playbackRate = Number(speed)
  }

  const formationDuration = (time) => {
    let seconds = Math.floor(time % 60),
      minutes = Math.floor(time / 60) % 60,
      hours = Math.floor(time / 3600)
    seconds = seconds < 10 ? `0${seconds}` : seconds
    minutes = minutes < 10 ? `0${minutes}` : minutes
    hours = hours < 10 ? `0${hours}` : hours
    // console.log(seconds)
    // console.log(minutes)
    // console.log(hours)

    if (hours.toString() === "00") {
      return `${minutes}:${seconds}`
    } else if (minutes.toString() === "00") {
      return `00:${seconds}`
    }
    return `${hours}:${minutes}:${seconds}`
  }

  const handleVideoLoad = () => {
    // duration in seconds
    // console.log(videoRef.current.duration)
    setTotalTime(formationDuration(videoRef.current.duration))
  }

  document.addEventListener('mouseup', (e) => {
    if (isScrubbing) toggleScrubbing(e)
  })
  document.addEventListener('mousemove', (e) => {
    if (isScrubbing) handleTimelineUpdate(e)
  })

  const toggleScrubbing = (e) => {
    const rect = timelineContainerRef.current.getBoundingClientRect()
    const percent = Math.min(Math.max(0, e.pageX - rect.x), rect.width) / rect.width
    // binary version of wich buttons are being pressed
    // console.log(e.buttons)
    if ((e.buttons && 1) === 1) {
      // console.log(true)
      setIsScrubbing(true)
    } else {
      setIsScrubbing(false)
    }

    if (isScrubbing) {
      setWasPaused(videoRef.current.paused)
      videoRef.current.pause()
    } else {
      videoRef.current.currentTime = percent * videoRef.current.duration
      if (!wasPaused) videoRef.current.play()
    }

    handleTimelineUpdate(e)
    setIsScrubbing(false)
  }

  const handleStopScrubbing = () => {
    setIsScrubbing(false)
    // console.log(isScrubbing)
  }

  const handleTimeUpdate = () => {
    setCurrentTime(formationDuration(videoRef.current.currentTime))
    const percent = videoRef.current.currentTime / videoRef.current.duration
    timelineContainerRef.current.style.setProperty("--progress-position", percent)
  }

  const handleTimelineUpdate = (e) => {
    const rect = timelineContainerRef.current.getBoundingClientRect()
    const percent = Math.min(Math.max(0, e.pageX - rect.x), rect.width) / rect.width

    timelineContainerRef.current.style.setProperty("--preview-position", percent)

    // set the thumb indicator when scrubbing 
    if (isScrubbing) {
      // to prevent highlighting the text
      e.preventDefault()
      timelineContainerRef.current.style.setProperty("--progress-position", percent)
    }
  }

  const handleTimeLineClick = (e) => {
    let timelineWidth = timelineContainerRef.clientWidth
    videoRef.currentTime = (e.offsetX / timelineWidth) / videoRef.current.duration
  }

  const skip = (duration) => {
    videoRef.current.currentTime += duration
  }

  let speeds = ["0.25", "0.5", "0.75", "1", "1.25", "1.5", "1.75", "2"]

  return (
    <div className={`video-container ${isPause ? "paused" : ""}  ${isFullScreen ? "fullscreen" : ""} ${isScrubbing && "scrubbing"}`} data-volume-level={`${isVolume}`} onMouseEnter={() => setIsKeyControlActive(true)} onMouseLeave={() => setIsKeyControlActive(false)} id="video-container" >
      <div className="video-controls-container">
        <div className="timeline-container" onMouseMove={handleTimelineUpdate} onMouseLeave={handleStopScrubbing} onMouseDown={toggleScrubbing} ref={timelineContainerRef} >
          <div className="timeline" onClick={handleTimeLineClick}>
            <div className="thumb-indicator"></div>
          </div>
        </div>
        <div className="controls">
          <button className="play-pause-btn" onClick={handleClickVideo} >
            {/* show pause when the video is playing */}
            {isPause && (
              <MdPlayArrow className="play-icon" />
            )}
            {isPlay && (
              <MdPause className="pause-icon" />
            )}
          </button>
          <div className="volume-container">
            <button className="mute-btn">
              <MdVolumeOff className='volume-muted-icon' />
              <MdVolumeDown className='volume-low-icon' />
              <MdVolumeUp className='volume-high-icon' />
            </button>
            <input type="range" className='volume-slider' min="0" max="1" onChange={handleVolumeSliderChange} step="any" />
          </div>
          <div className="duration-container">
            <div className="current-time">{currentTime}</div>
            /
            <div className="total-time">{totalTime}</div>
          </div>
          <button className="playbackrate-btn" onClick={() => setIsShowSpeed(isShowSpeed => !isShowSpeed)} >
            x{isPlayBackRate}
            <div className={`playbackrate-list-wrapper ${isShowSpeed ? "playbackrate-list-wrapper-show" : ""}`} >
              <ul className="playbackrate-list" onMouseLeave={() => setIsShowSpeed(false)}>
                {speeds.map((speed, index) => {
                  return (
                    <div key={index}>
                      {speed !== "1" ? (
                        <li className={`${isPlayBackRate.toString() === speed ? "playbackrate-list-item-active playbackrate-list-item" : "playbackrate-list-item"}`} onClick={() => handleRateChange(speed)} key={index} >{speed}</li>
                      ) : (
                        <li className={`${isPlayBackRate.toString() === speed ? "playbackrate-list-item-active playbackrate-list-item" : "playbackrate-list-item"}`} onClick={() => handleRateChange(speed)} key={index} >Normal</li>
                      )}
                    </div>
                  )
                })}
              </ul>
            </div>
          </button>
          <button className="fullscreen-btn" style={{ cursor: "pointer" }}  >
            {isFullScreen ? (
              <MdFullscreenExit onClick={handleFullScreenExit} />
            ) : (
              <MdFullscreen onClick={handleFullScreen} />
            )}
          </button>
        </div>
      </div>
      <video ref={videoRef} onPlay={handleVideoPlay} onPause={handleVideoPause} onClick={handleClickVideo} onLoadedMetadata={handleVideoLoad} onTimeUpdate={handleTimeUpdate} >
        <source src={videoUrl} />
      </video>
    </div>
  )
}

export default VideoPlayer