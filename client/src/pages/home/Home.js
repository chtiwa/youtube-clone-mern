import React, { useEffect } from 'react'
import './home.css'
import Videos from '../../components/videos/Videos'
import Tags from '../../components/tags/Tags'
import { useDispatch } from 'react-redux'
import { getVideos } from '../../features/videosSlice'

const Home = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getVideos())
  }, [dispatch])

  return (
    <div className="home">
      <Tags />
      <Videos />
    </div>
  )
}

export default Home