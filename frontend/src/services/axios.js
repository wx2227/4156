import axios from 'axios'
import Cookies from 'js-cookie'

axios.interceptors.request.use(
  function (config) {
    const token = Cookies.get('token')
    if (token) {
      config.headers.Authorization = 'Token ' + token
    }
    return config
  },
  function () {

  }
)

export default axios
