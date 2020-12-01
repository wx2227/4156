import axios from 'axios'
// import axios from './axios.js'

/**
 *
 * @param {*} accesstoken This is the access token of the user obtained from Google
 */
const googleLogin = async (accesstoken) => {
  const res = axios.post(
    'http://localhost:8000/rest-auth/google/',
    {
      access_token: accesstoken
    }
  )
  return res
}

export default googleLogin
