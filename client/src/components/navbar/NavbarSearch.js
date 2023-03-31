import React, { useState, useEffect } from 'react'
import './navbar.css'
import { MdOutlineAccountCircle, MdSearch, } from 'react-icons/md'
import { BsExclamationSquareFill, BsMicFill } from 'react-icons/bs'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getSearchResults } from '../../features/videosSlice'

const NavbarSearch = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { searchResults, searchLoading } = useSelector(state => state.videos)
  const { theme } = useSelector(state => state.users)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [search, setSearch] = useState('')
  const [searchPlaceholder, setSearchPlaceHolder] = useState("Search...")
  const [isMicOn, setIsMicOn] = useState(false)

  const handleSearch = (search) => {
    dispatch(getSearchResults(search))
    if (search.length > 0 && searchResults.length > 0) {
      setIsSearchOpen(true)
    }
  }

  const handleChange = ({ target }) => {
    setSearch(target.value)
    handleSearch(target.value)
  }

  const handleMicClick = (e) => {
    let speech = true
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    const recognition = new SpeechRecognition()
    recognition.interimResults = false
    recognition.lang = "en-US"

    recognition.onaudiostart = () => {
      setSearchPlaceHolder('Currently listening...')
      setIsMicOn(true)
    }

    recognition.onresult = (e) => {
      const transcript = e.results[0][0].transcript
      setSearch(transcript)
      handleSearch(transcript)
    }
    if (speech === true) {
      recognition.start()
    }
    recognition.onspeechend = () => {
      recognition.stop()
      setSearchPlaceHolder('Search...')
      setIsMicOn(false)
    }
    recognition.onnomatch = () => {
      recognition.stop()
      setSearchPlaceHolder("Didn't recognize the search!")
      setSearch("")
    }
  }

  const handleItemClick = (title) => {
    navigate(`/results?search=${title}`)
    setIsSearchOpen(false)
  }

  const handleMouseEnterInput = () => {
    if (search.length > 0 && searchResults.length > 0) {
      setIsSearchOpen(true)
    } else {
      setIsSearchOpen(false)
    }
  }

  return (
    <div className="navbar-search">
      <div className="navbar-search-container" onMouseLeave={() => setIsSearchOpen(false)}>
        <input type="text" className='navbar-search-container-input' value={search || ""} name="search" onChange={handleChange} minLength={2} maxLength={30} placeholder={`${searchPlaceholder}`} autoComplete='off' onMouseEnter={handleMouseEnterInput} />
        <div className="navbar-search-container-icon-wrapper">
          <MdSearch className="navbar-search-container-icon" />
        </div>
        <ul className={`${isSearchOpen ? "navbar-search-container-result-show" : "navbar-search-container-result"}`} data-theme={`${theme}`}>
          {!searchLoading && searchResults.length > 0 && searchResults.map((search, index) => {
            return (
              <li className='navbar-search-container-result-item' onClick={() => handleItemClick(search.title)} key={index} >
                <MdSearch className="navbar-search-container-item-icon" />
                {search.title}
              </li>)
          })}
        </ul>
      </div>
      <div className={`navbar-search-microphone ${isMicOn && "navbar-search-microphone-animate"}`} onClick={handleMicClick}>
        <BsMicFill className="navbar-search-icon-mic" />
      </div>
    </div>
  )
}

export default NavbarSearch