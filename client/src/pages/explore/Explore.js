import React, { useEffect } from 'react'
import Videos from '../../components/videos/Videos'
import Tags from '../../components/tags/Tags'
import { getTrendingVideos } from '../../features/videosSlice'
import { useDispatch } from 'react-redux'
const Explore = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getTrendingVideos())
  }, [dispatch])

  return (
    <div className='home'>
      <Tags />
      <Videos />
    </div>
  )
}

export default Explore