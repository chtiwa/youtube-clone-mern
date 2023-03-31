import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from './components/sidebar/Sidebar'
import MessageModal from './components/messageModal/MessageModal'
import { useSelector } from 'react-redux'

const Layout = () => {
  const { isMessageModalOpen } = useSelector(state => state.messageModal)
  const { theme } = useSelector(state => state.users)
  return (
    // when the width reaches 1000px the positioning of sidebar goes from sticky to absolute
    <div className="layout" data-theme={`${theme}`}>
      {isMessageModalOpen && <MessageModal />}
      <Sidebar />
      <Outlet />
    </div>
  )
}

export default Layout