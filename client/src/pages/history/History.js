import React, { useEffect } from 'react'
import './history.css'
import Videos from '../../components/videos/Videos'
import { useDispatch } from 'react-redux'
import { getVideosByHistory } from '../../features/videosSlice'

const History = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getVideosByHistory())
  }, [dispatch])

  return (
    <div className='history'>
      <Videos />
    </div>
  )
}

export default History