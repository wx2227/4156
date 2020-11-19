import axios from "axios";
import Cookies from 'js-cookie';

/**
 *
 * @param {*} accesstoken This is the access token of the user obtained from Google
 */
const googleLogin = async (accesstoken) => {
    let res = await axios.post(
        "http://localhost:8000/rest-auth/google/",
        {
            access_token: accesstoken,
        }
    );
    return await res;
};

export default googleLogin;