import React, { useState, useEffect } from 'react'
import './sidebar.css'
import GoogleLogin from '../googleLogin/GoogleLogin'
import { AiOutlineHome } from 'react-icons/ai'
import { BiMovie, BiNews } from 'react-icons/bi'
import { MdOutlineExplore, MdOutlineSubscriptions, MdVideoLibrary, MdLibraryMusic, MdSportsSoccer, MdSportsEsports, MdLiveTv, MdSettings, MdOutlineHelpOutline, MdOutlinedFlag, MdHistory, MdOutlineAccountCircle } from 'react-icons/md'
import { useSelector } from 'react-redux'
import { useNavigate, useLocation } from 'react-router-dom'


const Menu = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { isSidebarOpen } = useSelector(state => state.sidebar)
  const { isLoggedIn, theme } = useSelector(state => state.users)
  const [isWatch, setIsWatch] = useState(false)
  const [openCurrentIndex, setOpenCurrentIndex] = useState(0)
  const [closedCurrentIndex, setClosedCurrentIndex] = useState(0)

  useEffect(() => {
    if (location.pathname.includes("watch")) {
      setIsWatch(true)
    } else {
      setIsWatch(false)
    }
  })

  let sidebarClosedList = [
    // split in half for the sign in btn
    { Icon: AiOutlineHome, text: "Home" },
    { Icon: MdOutlineExplore, text: "Explore" },
    { Icon: MdOutlineSubscriptions, text: "Subscriptions" },
    { Icon: MdHistory, text: "History" }
  ]

  let sidebarOpenList = [
    // split in half for the sign in btn
    { Icon: AiOutlineHome, text: "Home" },
    { Icon: MdOutlineExplore, text: "Explore" },
    { Icon: MdOutlineSubscriptions, text: "Subscriptions" },
    { Icon: MdHistory, text: "History" },
    { Icon: MdVideoLibrary, text: "Library" },
    { Icon: MdLibraryMusic, text: "Music" },
    { Icon: MdSportsSoccer, text: "Sports" },
    { Icon: MdSportsEsports, text: "Gaming" },
    { Icon: BiMovie, text: "Movies" },
  ]

  const handleOpenClick = (index, text) => {
    if (index >= 4) return
    setOpenCurrentIndex(index)
    setClosedCurrentIndex(index)
    if (text === "Home" || text === "Explore") {
      navigate('/')
    } else if (text === "History") {
      navigate('/history')
    } else if (text === "Subscriptions") {
      navigate('/subscriptions')
    }
  }

  const handleClosedClick = (index, text) => {
    if (index >= 4) return
    setOpenCurrentIndex(index)
    setClosedCurrentIndex(index)
    if (text === "Home") {
      navigate('/')
    } else if (text === "History") {
      navigate('/history')
    } else if (text === "Subscriptions") {
      navigate('/subscriptions')
    } else if (text === "Explore") {
      navigate('/explore')
    }
  }

  return (
    <div className={`${isSidebarOpen ? "menu" : "hide-menu"}`} data-theme={`${theme}`} style={{ display: `${isWatch ? "none" : "block"}` }} >
      <ul className="menu-wrapper">
        {isSidebarOpen ? sidebarOpenList.map((item, index) => {
          const { Icon, text } = item
          return (
            <>
              <li className={`${openCurrentIndex === index ? "menu-list-item menu-list-item-active" : "menu-list-item"}`} onClick={() => handleOpenClick(index, text)} key={index}>
                <Icon className="menu-list-item-icon" />
                {text}
              </li>
              {index === 3 && (<hr className='menu-hr' />)}
            </>
          )
        }) : sidebarClosedList.map((item, index) => {
          const { Icon, text } = item
          return (
            <li className={`${closedCurrentIndex === index ? "menu-list-item-active menu-list-item-hidden" : "menu-list-item-hidden"}`} onClick={() => handleClosedClick(index, text)} key={index} >
              <Icon className="menu-list-item-icon" />
              {text}
            </li>
          )
        })}
        {isSidebarOpen && !isLoggedIn && (
          <>
            <hr className='menu-hr' />
            <div className="menu-signin" >
              <p className="menu-signin-p">
                Sign in to like videos, comment and subscribe.
              </p>
              <GoogleLogin />
            </div>
          </>
        )}
      </ul>
    </div>
  )
}

export default Menu