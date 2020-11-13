
import React, { Component, useState } from 'react'
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import { useHistor} from "react-router-dom";

import './Login.css'

const CLIENT_ID = '117590776103-qt4jgq89g0vhbeu72v4vja56s6sti0as.apps.googleusercontent.com';


function GoogleButton(props) {

    const [isLogined, setLogin] = useState(false);
    const [accessToken, setToken] = useState("");
    const [email, setEmail] = useState("");

    let history = useHistory();

    const login = (response) => {
        
        // either sent to server to verify lion email or we check here 
        // TODO: verify the email is lionmails
        //history.push('/tmp', {name: 'Hello'});
        // GOTO another page 

    }

    const logout = (response) => {
        setLogin(false);
    }

    const handleLoginFailure = (response) => {
        alert('Failed to log in')
    }

    const handleLogoutFailure = (response) => {
        alert('Failed to log out')
    }

    return (
        <div id="UltraBox">
            <div id="outerBox"> 
                <div><b id="title">AirNote</b></div>
                <div id="gLogin">
                    <div>
                        { isLogined ?
                        <GoogleLogout
                        clientId={ CLIENT_ID }
                        buttonText='Logout'
                        onLogoutSuccess={ logout }
                        onFailure={ handleLogoutFailure }
                        >
                        </GoogleLogout>: <GoogleLogin
                        clientId={ CLIENT_ID }
                        buttonText='Login with Google'
                        onSuccess={ login }
                        onFailure={ handleLoginFailure }
                        cookiePolicy={ 'single_host_origin' }
                        responseType='code,token'
                        />
                        }
                        { accessToken ? <h5>Your: email: <br/><br/> { email}</h5> : null }

                    </div>
                </div>
            </div>
        </div>
    );
  
}

export default GoogleButton;
