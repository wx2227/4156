import React from 'react'
import { Component, useState, useEffect} from 'react'
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import { useHistory} from "react-router-dom";
import { useLocation } from "react-router-dom";
import "./MainPage.css";
import axios from 'axios';
import NoteList from '../components/NotesListView';



function Mainpage(props) {
    const [courses, setCourses] = useState(null);
    
    // make search bar sticky on top
    useEffect(
        () => {
            // fetch courses
            updateCourses();
            // update course notes if course is provided 
        }, []
    );

    async function updateCourses() {
        console.log("update Courses");
        // fetch courses
        await fetch("http://localhost:8000/api/course/")
            .then(res => res.json())
            .then(
                (result) => {
                    setCourses(result);
                }).catch(err => {alert("Cannot retrieve course info")});

    }

    const showCourses = () => {
        return (<div>We currently have the notes for following available courses: {courses && <ol>{courses.map((course) => <li>{course.course_number}</li>)} </ol>} </div>);
    }


    return (
        <div>
            {courses && showCourses()}
        </div>
    );
}

export default Mainpage;
