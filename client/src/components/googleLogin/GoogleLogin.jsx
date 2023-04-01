import React, { useState, useEffect } from 'react'
import '../sidebar/sidebar.css'
import { useGoogleLogin } from '@react-oauth/google';
import { MdOutlineAccountCircle } from 'react-icons/md'
import { openMessageModal } from '../../features/messageModalSlice';
import { authenticate, setAuth } from '../../features/usersSlice';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios'

const GoogleLoginComponent = () => {
  const dispatch = useDispatch()
  const { checkLoginLoading, isLoggedIn } = useSelector(state => state.users)
  const [user, setUser] = useState([])
  // const [accessToken, setAccessToken] = useState(null)

  // useEffect(() => {
  //   setAccessToken(window.localStorage.getItem('access_token'))
  //   console.log(accessToken)
  // }, [accessToken])

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => {
      setUser(codeResponse)
      // window.localStorage.setItem('access_token', codeResponse.access_token)
    },
    onError: (error) => {
      console.log(error)
      dispatch(openMessageModal({ message: 'Google Sign In was unsuccessful. Try again later', success: false }))
    }
  })

  useEffect(() => {
    // when the user change aka the user logs in perform this api call to get the info
    const getUserCredentials = async () => {
      try {
        const { data } = await axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
          headers: {
            Authorization: `Bearer ${user.access_token}`,
            Accept: 'application/json'
          }
        })
        console.log(data)
        dispatch(authenticate({ username: data.name, email: data.email, imageUrl: data.picture }))
        dispatch(setAuth({ username: data.name, imageUrl: data.picture }))
        dispatch(openMessageModal({ message: 'Google Sign In was successful!', success: true }))
      } catch (error) {
        console.log(error)
      }
    }

    // after we check the login of the user see if this function fires or not  
    if (user && checkLoginLoading && !isLoggedIn) {
      getUserCredentials()
    }
  }, [user])


  return (
    <div>
      <button className="menu-btn" onClick={login} >
        <MdOutlineAccountCircle className="menu-btn-icon" />
        SIGN IN
      </button>
    </div>
  )
}

export default GoogleLoginComponent