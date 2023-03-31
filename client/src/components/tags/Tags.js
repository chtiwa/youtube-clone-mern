import React, { useState, useEffect } from 'react'
import './tags.css'
import { MdOutlineArrowBackIosNew, MdOutlineArrowForwardIos } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux'
import { getRandomTags, getVideosByTag, getVideos } from '../../features/videosSlice'

const Tags = () => {
  const dispatch = useDispatch()
  const { tags, tagsLoading } = useSelector(state => state.videos)
  const { theme } = useSelector(state => state.users)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [activeIndex, setActiveIndex] = useState(0)
  let tagsList = ["All", ...tags]
  useEffect(() => {
    dispatch(getRandomTags())
  }, [dispatch])

  const handleTagClick = (index, tag) => {
    // console.log(tag)
    setActiveIndex(index)
    if (tag !== "All") {
      dispatch(getVideosByTag(tag))
    } else {
      dispatch(getVideos())
    }
  }

  return (
    <div className="tags" data-theme={`${theme}`}>
      {currentIndex <= tags.length - 13 && (
        <button className="next-btn" onClick={() => setCurrentIndex(currentIndex => currentIndex + 1)} ><MdOutlineArrowForwardIos className="tags-icon" /></button>
      )}
      {currentIndex !== 0 && (
        <button className="prev-btn" onClick={() => setCurrentIndex(currentIndex => currentIndex - 1)} ><MdOutlineArrowBackIosNew className="tags-icon" /></button>
      )}
      <ul className="tags-list" style={{ transform: `translateX(-${currentIndex * 150}px)` }} >
        {!tagsLoading && tagsList?.map((tag, index) => {
          return (
            <li className={`${activeIndex === index ? "tags-item tags-item-active" : "tags-item"}`} onClick={() => handleTagClick(index, tag)} key={index} > {tag} </li>
          )
        })}
      </ul>
    </div>
  )
}

export default Tags