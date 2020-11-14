
import React, { Component, useState, useEffect} from 'react'
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import { useHistory} from "react-router-dom";
import { useLocation } from "react-router-dom";
import "./MainPage.css";

function Mainpage(props) {
    let location = useLocation();
    let history = useHistory();

    // make search bar sticky on top
    useEffect(
        () => {
            const onScroll = () => { 
                let navbar = document.getElementById("nav");
                let sticky = navbar.offsetTop;

                if (window.pageYOffset >= sticky) {
                    navbar.classList.add("sticky")
                  } else {
                    navbar.classList.remove("sticky");
                }
            }
            window.addEventListener('scroll', onScroll)
            return () => {
                window.removeEventListener('scroll', onScroll) // clean up function
            }
        },
        []
    );

    // TODO:
    // add search bar handler 
    const handleClick = () => {
        alert(document.getElementById("search_input").value);
    }

    return (
        <div className = "outerBody">
            <div id="nav">
                <a className="active" href="javascript:void(0)">Home</a>
                <div className="search-container">
                     <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
                         <input id="search_input" type="text" placeholder="Search.." name="search"></input>
                         <button type="submit" onClick={handleClick}><i className="fa fa-search"></i></button>
                 </div>
            </div>
            <div className="content">
            </div>
        </div>

        
    );
}

export default Mainpage;
