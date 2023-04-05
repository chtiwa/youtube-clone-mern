import React, { useState, useEffect } from 'react'
import './sidebar.css'
import GoogleLogin from '../googleLogin/GoogleLogin'
import { AiOutlineHome } from 'react-icons/ai'
import { BiMovie, BiNews } from 'react-icons/bi'
import { MdOutlineExplore, MdOutlineSubscriptions, MdVideoLibrary, MdLibraryMusic, MdSportsSoccer, MdSportsEsports, MdLiveTv, MdSettings, MdOutlineHelpOutline, MdOutlinedFlag, MdHistory, MdOutlineAccountCircle } from 'react-icons/md'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, useLocation } from 'react-router-dom'
import { closeSidebar } from '../../features/sidebarSlice'


const Menu = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const { isSidebarOpen } = useSelector(state => state.sidebar)
  const { isLoggedIn, theme } = useSelector(state => state.users)
  const [isWatch, setIsWatch] = useState(false)
  // if the sidebar is open
  const [openCurrentIndex, setOpenCurrentIndex] = useState(0)
  // if the sidebar is closed
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
    console.log(index)
    if (index >= 4) return
    if (index >= 2 && isLoggedIn) {
      setOpenCurrentIndex(index)
      setClosedCurrentIndex(index)
    } else if (index < 2) {
      setClosedCurrentIndex(index)
      setOpenCurrentIndex(index)
    } else {
      return
    }
    if (text === "Home" || text === "Explore") {
      navigate('/')
    } else if (text === "History") {
      navigate('/history')
    } else if (text === "Subscriptions") {
      navigate('/subscriptions')
    }
  }

  const handleClosedClick = (index, text) => {
    // the icons where their index is bigger than 4 are obselete
    if (index >= 4) return
    // if the user is not logged in don't go to history or subscribtions
    if (index >= 2 && isLoggedIn) {
      setOpenCurrentIndex(index)
      setClosedCurrentIndex(index)
    } else if (index < 2) {
      setClosedCurrentIndex(index)
      setOpenCurrentIndex(index)
    } else {
      return
    }
    if (text === "Home") {
      navigate('/')
    } else if (text === "Explore") {
      navigate('/explore')
    } else if (text === "History") {
      navigate('/history')
    } else if (text === "Subscriptions") {
      navigate('/subscriptions')
    }
  }



  useEffect(() => {
    const closeMenu = () => {
      if (window.innerWidth < 1050) {
        dispatch(closeSidebar())
      }
    }
    window.addEventListener("resize", closeMenu)
    // Cleanup function to remove the event listener
    return () => window.removeEventListener("resize", closeMenu)
  }, [])

  return (
    <div className={`${isSidebarOpen ? "menu" : "hide-menu"}`} data-theme={`${theme}`} style={{ display: `${isWatch ? "none" : "block"}` }} >
      <ul className="menu-wrapper">
        {isSidebarOpen ? sidebarOpenList.map((item, index) => {
          const { Icon, text } = item
          return (
            <>
              <li className={`${openCurrentIndex === index ? " menu-list-item-active" : ""} menu-list-item`} onClick={() => handleOpenClick(index, text)} key={index}>
                <Icon className="menu-list-item-icon" />
                {text}
              </li>
              {index === 3 && (<hr className='menu-hr' />)}
            </>
          )
        }) : sidebarClosedList.map((item, index) => {
          const { Icon, text } = item
          return (
            <li className={`${closedCurrentIndex === index ? "menu-list-item-active " : ""} menu-list-item-hidden`} onClick={() => handleClosedClick(index, text)} key={index} >
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