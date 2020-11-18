//@flow
import React from 'react';
import { Component, useState} from 'react';
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import { useHistory} from "react-router-dom";
import { useLocation } from "react-router-dom";
import MainPage from "./MainPage";

// an authentication wrapper, prevent the user from entering main page without login


function Main(props) {
    let location = useLocation();
    let history = useHistory();

    // check if we have the params from login page 
    // if not we redirect to login page 
    if (location.state === undefined) {
        history.replace("/");
    } else {
        if (!location.state.hasOwnProperty("email") || !location.state.hasOwnProperty("client_id")) {
            history.replace("/");
        } else {
            // else we render the main page 
            return (
                <MainPage email={location.state.email} client_id = {location.state.client_id}/>
            );
        }

    }

    return null;
}

export default Main;
