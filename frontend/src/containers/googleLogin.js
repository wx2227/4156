//@flow
import * as React from 'react';
import { Component, useState } from 'react';
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import { useHistory} from "react-router-dom";
import axios from 'axios';
import Cookies from 'js-cookie';

import './Login.css'
import googleLogin from "../services/googleLoginService";

const CLIENT_ID = '117590776103-qt4jgq89g0vhbeu72v4vja56s6sti0as.apps.googleusercontent.com';


function GoogleButton() {

    //const [isLogined, setLogin] = useState(false);
    //const [accessToken, setToken] = useState("");
    //const [email, setEmail] = useState("");

    let history = useHistory();

    /**
     *
     * @param {*} accesstoken This is the access token of the user obtained from Google
     */
    const responseGoogle = async(response) => {
        // use this as accessToken from google: response.accessToken
        const googleResponse  = await googleLogin(response.accessToken);
        const res = await getUserInfo(response.getBasicProfile().getEmail());
        if(res && res.data && res.data[0].user) {
            // set cookie 
            Cookies.set("user_id", res.data[0].user.id);
            Cookies.set("token", googleResponse.data);
            Cookies.set("firstname", res.data[0].user.first_name);
            Cookies.set("lastname", res.data[0].user.last_name);
            history.replace("/airnote/main")
            window.location.href = "/airnote/main";
        }
    }
    

    const getUserInfo = async(email) => {
        const request = "http://localhost:8000/api/user/?email=" + email;
        let res = await axios.get(request);
        return await res;
    }

    const handleLoginFailure = () => {
        alert('Failed to log out')
    }

    return (
        <div id="UltraBox">
            <div id="outerBox"> 
                <div><b id="title">AirNote</b></div>
                <div id="gLogin">
                    <div>
                        <GoogleLogin
                        clientId={ CLIENT_ID }
                        buttonText='Login with Google'
                        onSuccess={responseGoogle }
                        onFailure={ handleLoginFailure }
                        cookiePolicy={ 'single_host_origin' }
                        responseType='code,token'
                        />           
                    </div>
                </div>
            </div>
        </div>
    );
  
}

export default GoogleButton;
