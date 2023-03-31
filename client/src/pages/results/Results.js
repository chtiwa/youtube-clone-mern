import React, { useState, useEffect } from 'react'
import './results.css'
import Videos from '../../components/videos/Videos'
import { getVideosBySearch } from '../../features/videosSlice'
import { useDispatch } from 'react-redux'
import { useSearchParams } from 'react-router-dom'

const Result = () => {
  // get the search query
  const dispatch = useDispatch()
  const [searchParams, setSearchParams] = useSearchParams()

  // useEffect(() => {
  //   console.log(searchParams.get("search"))
  // }, [searchParams])

  useEffect(() => {
    dispatch(getVideosBySearch(searchParams.get("search")))
  }, [dispatch, searchParams])

  return (
    <div className="result">
      <Videos />
    </div>
  )
}

export default Result