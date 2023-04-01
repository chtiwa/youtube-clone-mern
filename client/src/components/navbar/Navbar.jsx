import React, { useState, useEffect } from 'react'
import './navbar.css'
import NavbarSearch from './NavbarSearch'
import GoogleLogin from '../googleLogin/GoogleLogin'
// import { GoogleLogout } from "react-google-login"
import { googleLogout } from '@react-oauth/google'
import { AiOutlineVideoCameraAdd } from 'react-icons/ai'
import { BsMoonStars } from 'react-icons/bs'
import { MdOutlineAccountCircle, MdSearch, MdOutlineMoreVert, MdLogout, MdOutlineChevronRight } from 'react-icons/md'
import { GiHamburgerMenu } from 'react-icons/gi'
import { useDispatch, useSelector } from 'react-redux'
import { closeSidebar, openSidebar } from '../../features/sidebarSlice'
import { useLocation, useNavigate } from 'react-router-dom'
import { openMessageModal } from '../../features/messageModalSlice'
import { setAuth, logout, getTheme, setTheme, checkLogin } from '../../features/usersSlice'

const Navbar = () => {
  const dispatch = useDispatch()
  const location = useLocation()
  const navigate = useNavigate()
  const { isSidebarOpen } = useSelector(state => state.sidebar)
  const { isLoggedIn, imageUrl, theme } = useSelector(state => state.users)

  const [isHorizOpen, setIsHorizOpen] = useState(false)
  const [isThemeOpen, setIsThemeOpen] = useState(false)

  useEffect(() => {
    dispatch(getTheme())
    // check if there is a cookie
    dispatch(checkLogin())
  }, [dispatch])

  const handleMenu = () => {
    if (isSidebarOpen) dispatch(closeSidebar())
    else dispatch(openSidebar())
  }

  // const googleLogoutSuccess = () => {
  //   setIsHorizOpen(isHorizOpen => !isHorizOpen)
  //   dispatch(logout())
  //   dispatch(setAuth({ name: "", imageUrl: "", tokenId: "" }))
  //   dispatch(openMessageModal({ message: "Logout was successful", success: true }))
  // }

  const logOut = () => {
    setIsHorizOpen(isHorizOpen => !isHorizOpen)
    googleLogout()
    dispatch(setAuth({ name: "", imageUrl: "" }))
    dispatch(openMessageModal({ message: "Logout was successful", success: true }))
  };

  const handleClickTheme = (theme) => {
    dispatch(setTheme(theme))
    setIsThemeOpen(false)
  }

  return (
    <div className="navbar" data-theme={`${theme}`} >
      <div className="navbar-menu">
        {(!location.pathname.includes('/watch') || location.pathname === '/video') && (
          <div className="navbar-menu-icon-wrapper" onClick={handleMenu} data-theme={`${theme}`}>
            <GiHamburgerMenu className="navbar-menu-icon" />
          </div>
        )}
        <img src="logo.png" alt="" onClick={() => navigate('/')} />
      </div>
      {/* navbar-search relative to the search div */}
      <NavbarSearch />
      {/* primary tolltip */}
      <div className="navbar-btn-wrapper" data-theme={`${theme}`}>
        {isLoggedIn && (<>
          <div className="navbar-horiz-icon-wrapper">
            <MdOutlineMoreVert className="navbar-horiz-icon" onClick={() => setIsHorizOpen(isHorizOpen => !isHorizOpen)} />
          </div>
          <ul className={`${isHorizOpen ? "navbar-more-horiz-content-show" : "navbar-more-horiz-content"}`} onMouseLeave={() => setIsHorizOpen(false)}>
            <li className="navbar-more-horiz-item" onClick={logOut}  >
              <div className="navbar-item-wrapper">
                <MdLogout className="more-horiz-icon" />Logout
              </div>
            </li>
            {/* <GoogleLogout
              clientId={`${import.meta.env.VITE_APP_CLIENTID}`}
              render={(renderProps) => (
                <li className="navbar-more-horiz-item" onClick={renderProps.onClick} disabled={renderProps.disabled}  >
                  <div className="navbar-item-wrapper">
                    <MdLogout className="more-horiz-icon" />Logout
                  </div>
                </li>
              )}
              onLogoutSuccess={googleLogoutSuccess}
            /> */}

            <li className="navbar-more-horiz-item" onMouseLeave={() => setIsThemeOpen(false)} data-theme={`${theme}`}>
              <div className="navbar-item-wrapper navbar-item-wrapper-relative" onClick={() => setIsThemeOpen(true)}  >
                <BsMoonStars className="more-horiz-icon" />Theme
                <MdOutlineChevronRight className="more-horiz-left-icon " />
                {/* secondary tolltip */}
                <ul className={`${isThemeOpen ? "navbar-item-theme-content-show" : "navbar-item-theme-content"}`}>
                  <li className={`navbar-item-theme-content-item ${theme === "dark" && "navbar-theme-active"}`} onClick={() => handleClickTheme("dark")} data-theme={`${theme}`}>
                    Dark theme
                  </li>
                  <li className={`navbar-item-theme-content-item ${theme === "light" && "navbar-theme-active"}`} onClick={() => handleClickTheme("light")} data-theme={`${theme}`}>
                    Light theme
                  </li>
                </ul>
              </div>
            </li>
          </ul>
        </>)}
        {isLoggedIn ? (
          <div className="navbar-auth-wrapper">
            <div className="navbar-auth-inner">
              <AiOutlineVideoCameraAdd className="navbar-auth-icon" onClick={() => navigate('/create')} />
              <div className="navbar-auth-inner-content">Create</div>
            </div>
            <img src={imageUrl} alt="" className="navbar-auth-image" referrerPolicy="no-referrer" />
          </div>
        ) : (
          <GoogleLogin />
        )}
      </div>
    </div>
  )
}

export default Navbar