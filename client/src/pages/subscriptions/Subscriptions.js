import React, { useEffect } from 'react'
import Videos from '../../components/videos/Videos'
import { useDispatch } from 'react-redux'
import { getVideosBySubscriptions } from "../../features/videosSlice"

const Subscriptions = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getVideosBySubscriptions())
  }, [dispatch])
  return (
    <div className='subscriptions' style={{ width: "100%" }}>
      <Videos />
    </div>
  )
}

export default Subscriptions