// @flow
import * as React from 'react'
import { GoogleLogin } from 'react-google-login'
import axios from '../services/axios'
import Cookies from 'js-cookie'

import './Login.css'
import googleLogin from '../services/googleLoginService'

const CLIENT_ID = '117590776103-qt4jgq89g0vhbeu72v4vja56s6sti0as.apps.googleusercontent.com'
const lionMail = 'columbia.edu'

function GoogleButton () {
  /**
     *
     * @param {*} accesstoken This is the access token of the user obtained from Google
     */
  const responseGoogle = async (response) => {
    // use this as accessToken from google: response.accessToken
    const profile = response.getBasicProfile()
    const userEmail = profile.getEmail()
    const imgUrl = profile.getImageUrl()

    if (!userEmail.endsWith(lionMail)) {
      alert('Please sign in with Lionmail')
      return
    }

    const googleResponse = await googleLogin(response.accessToken)

    // axios use accesstoken as credential
    Cookies.remove('token')
    Cookies.set('token', googleResponse.data.key)

    const res = await getUserInfo(userEmail)

    if (res && res.data && res.data[0]) {
      // remove cookie
      Cookies.remove('user_id')
      Cookies.remove('firstname')
      Cookies.remove('lastname')
      Cookies.remove('url')
      Cookies.remove('admin')
      // set cookie
      Cookies.set('user_id', res.data[0].id)
      Cookies.set('firstname', res.data[0].first_name)
      Cookies.set('lastname', res.data[0].last_name)
      Cookies.set('admin', res.data[0].is_superuser)
      Cookies.set('url', imgUrl)
      window.location.href = '/airnote/department'
    }
  }

  const getUserInfo = async (email) => {
    const request = 'http://localhost:8000/api/user/?email=' + email
    const res = await axios.get(request)
    return await res
  }

  const handleLoginFailure = () => {
    alert('Failed to log out')
  }

  return (
    <div id='UltraBox'>
      <div id='outerBox'>
        <div><b id='title'>AirNote</b></div>
        <div id='gLogin'>
          <div>
            <GoogleLogin
              clientId={CLIENT_ID}
              buttonText='Login with Google'
              onSuccess={responseGoogle}
              onFailure={handleLoginFailure}
              cookiePolicy='single_host_origin'
              responseType='code,token'
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default GoogleButton
