
import React, { Component, useState, useEffect} from 'react'
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import { useHistory} from "react-router-dom";
import { useLocation } from "react-router-dom";
import "./MainPage.css";
import axios from 'axios';

function Mainpage(props) {
    let location = useLocation();
    let history = useHistory();

    const [courses, setCourses] = useState(null);
    const [couerse, setCourse] = useState(null); // Is user setting course? we re-render the current page if so

    // make search bar sticky on top
    useEffect(
        () => {
            const onScroll = () => { 
                let navbar = document.getElementById("nav");
                let sticky = navbar.offsetTop;

                if (window.pageYOffset >= sticky) {
                    navbar.classList.add("sticky");
                  } else {
                    navbar.classList.remove("sticky");
                }
            }
            window.addEventListener('scroll', onScroll);
            
            // fetch courses
            fetch("http://localhost:8000/api/course/")
                .then(res => res.json())
                .then(
                    (result) => {
                        setCourses(result);
                    }).catch(err => {alert("Cannot retrieve course info")}); 
                


            return () => {
                window.removeEventListener('scroll', onScroll) // clean up function
            }
        },
        []
    );


    const showCourses = () => {
        return (<div>We currently have the notes for following available courses: {courses && <ol>{courses.map((course) => <li>{course.course_number}</li>)} </ol>} </div>);
    }

    const handleClick = async () => {
       const course_number = document.getElementById("search_input").value;
       const request = "http://localhost:8000/api/course/?course_number=" + course_number;
       fetch(request)
       .then(res => res.json())
       .then(
           (result) => {
               console.log(result);
           }).catch(err => {alert("Cannot retrieve course info")}); 
       
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
                {showCourses()}
            </div>
        </div>

        
    );
}

export default Mainpage;
