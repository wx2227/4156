
import React, { Component, useState} from 'react'
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import { useHistory} from "react-router-dom";
import { useLocation } from "react-router-dom";


function Mainpage(props) {
    let location = useLocation();
    let history = useHistory();

    return (<div>{props.email}sss</div>);
}

export default Mainpage;
