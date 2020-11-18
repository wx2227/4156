//@flow
import * as React from 'react';
import { Component, useState } from 'react';
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import { useHistory} from "react-router-dom";
import axios from 'axios';

import './Login.css'
import googleLogin from "../services/googleLoginService";

const CLIENT_ID = '117590776103-qt4jgq89g0vhbeu72v4vja56s6sti0as.apps.googleusercontent.com';


function GoogleButton(props) {

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
        history.replace("/airnote/main", {client_id: CLIENT_ID, email: response.getBasicProfile().getEmail()})
    }
    

    const handleLoginFailure = (response) => {
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
