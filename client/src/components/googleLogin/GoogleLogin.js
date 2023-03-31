import React, { useEffect } from 'react'
import '../sidebar/sidebar.css'
import { GoogleLogin } from 'react-google-login';
import { gapi } from 'gapi-script'
import { MdOutlineAccountCircle } from 'react-icons/md'
import { openMessageModal } from '../../features/messageModalSlice';
import { authenticate, setAuth } from '../../features/usersSlice';
import { useDispatch } from 'react-redux';

const GoogleLoginComponent = () => {
  const dispatch = useDispatch()
  // const clientId = "195789017703-fln5iocpgj453pd3bm7vfkrpv4n490ln.apps.googleusercontent.com"

  useEffect(() => {
    const initClient = () => {
      gapi.client.init({
        client_id: process.env.REACT_APP_CLIENTID,
        scope: ''
      });
    };
    gapi.load('client:auth2', initClient);
  }, [])

  const googleSuccess = async (res) => {
    const result = res?.profileObj;
    const token = res?.tokenId;
    // console.log(res)
    try {
      dispatch(authenticate({ username: result.name, email: result.email, imageUrl: result.imageUrl }))
      dispatch(setAuth({ username: result.name, imageUrl: result.imageUrl, tokenId: token }))
      dispatch(openMessageModal({ message: 'Google Sign In was successful!', success: true }))
    } catch (error) {
      console.log(error);
    }
  };

  // show message modal
  const googleError = () => {
    dispatch(openMessageModal({ message: 'Google Sign In was unsuccessful. Try again later', success: false }))
  }

  return (
    <div>
      <GoogleLogin
        clientId={process.env.REACT_APP_CLIENTID}
        render={(renderProps) => (
          <button className={`${renderProps.disabled ? "menu-btn-disabled" : "menu-btn"}`} onClick={renderProps.onClick} disabled={renderProps.disabled}>
            <MdOutlineAccountCircle className={`${renderProps.disabled ? "menu-btn-icon-disabled" : "menu-btn-icon"}`} />
            SIGN IN</button>
        )}
        onSuccess={googleSuccess}
        onFailure={googleError}
        cookiePolicy={'single_host_origin'}
        isSignedIn={true}
      />
    </div>
  )
}

export default GoogleLoginComponent