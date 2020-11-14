
import React, { Component, useState } from 'react'
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import { useHistory} from "react-router-dom";
import axios from 'axios';

import './Login.css'

const CLIENT_ID = '117590776103-qt4jgq89g0vhbeu72v4vja56s6sti0as.apps.googleusercontent.com';


function GoogleButton(props) {

    const [isLogined, setLogin] = useState(false);
    const [accessToken, setToken] = useState("");
    const [email, setEmail] = useState("");

    let history = useHistory();

    /**
     *
     * @param {*} accesstoken This is the access token of the user obtained from Google
     */
    const googleLogin = async (accesstoken) => {
        // either sent to server to verify lion email or we check here
        // TODO: verify the email is lionmails
        //history.push('/tmp', {name: 'Hello'});
        // GOTO another page

        // get the exchanged token from server
        // then the info of user can be accessed through /api/user/ (contained email address)
        let res = await axios.post(
            "http://localhost:8000/rest-auth/google/",
            {
                access_token: accesstoken,
            }
        );
        console.log(res);
        return await res.status;
    };

    const login = (response) => {
        
        // either sent to server to verify lion email or we check here 
        // TODO: verify the email is lionmails
        //history.push('/tmp', {name: 'Hello'});
        // GOTO another page 

        // navigate to main page and pass states
        history.push("/main", {client_id: CLIENT_ID, email: response.getBasicProfile().getEmail()})


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
