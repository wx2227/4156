//@flow
import * as React from 'react'
import { Component, useState, useEffect} from 'react'
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import { useHistory} from "react-router-dom";
import { useLocation } from "react-router-dom";
import "./MainPage.css";
import axios from 'axios';
import NoteList from '../components/NotesListView';


type props = {}

function Mainpage(props : props) : React.Node {
    let history = useHistory();

    const [courses, setCourses] = useState(null);
    const [course, setCourse] = useState(null); // Is user setting course? we re-render the current page if so
    const [isMain, setMain] = useState(true);
    const [notes, setNotes] = useState(null);

    // make search bar sticky on top
    useEffect(
        () => {
            const onScroll = () => {
                let navbar = document && document.getElementById("nav");
                let sticky = navbar && navbar.offsetTop;

                if (window.pageYOffset >= sticky) {
                    navbar && navbar.classList.add("sticky");
                  } else {
                    navbar && navbar.classList.remove("sticky");
                }
            }
            window.addEventListener('scroll', onScroll);

            // fetch courses
            updateCourses();

            return () => {
                window.removeEventListener('scroll', onScroll) // clean up function
            }
        },
        []
    );

    async function updateCourses() {
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

    async function handleClick() {
        // fetch course
       let course_requested = null;
       let notes_requested = [];
       let course_number = "error";
       let element = document && document.getElementById("search_input"); 
       if (element instanceof HTMLInputElement) {
            course_number =  element.value;
       }
       if (course_number === "error") {
           alert("Cannot retrieve the input");
       } else if (course_number !== "") {
            const request = "http://localhost:8000/api/course/?course_number=" + course_number;

            await fetch(request)
            .then(res => res.json())
            .then(
                (result) => {
                    if (result.length === 0) {
                        setCourse(null);
                        setNotes([]);
                    } else {
                        course_requested = result[0];
                    }
                }).catch(err => {alert("Cannot retrieve course info")});

            // fetch notes
            // if the course is not empty
            if (course_requested) {
                const note_request = "http://localhost:8000/api/note/?course_number=" + course_number;
                await fetch(note_request)
                    .then(res => res.json())
                    .then(
                        (result) => {
                            notes_requested = result;
                        }).catch(err => {alert("Cannot retrieve notes info")});
            }
            setCourse(course_requested);
            setNotes(notes_requested);
            setMain(false);
        } else {
            alert("Please input the course number");
        }
    }

    // navigate back to main
    const handleClickHome = () : void => {
        updateCourses();
        setCourse(null);
        setNotes([]);
        setMain(true);
    }

    const showNotes = () : React.Node => {
        if (course) {
            let num = course.course_number;
            if (notes.length === 0) {
                return (<b>The course has no notes available</b>)
            } else {
                return (<NoteList notes={notes} />);
            }
        } else {
            return (<b>The course does not exists</b>);
        }

    }

    const handleLogout = () => {
        // clear history
        history.replace("/");
    }

    return (
        <div className = "outerBody">
            <div id="nav">
                <a className="active" onClick = {handleClickHome}>Home</a>
                <div className="search-container">
                    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
                    <input id="search_input" type="text" placeholder="Search.." name="search"></input>
                    <button type="submit" onClick={handleClick}><i className="fa fa-search"></i></button>
                    <button onClick={()=> window.location.href = "/upload"}>Upload</button>
                    <button onClick={handleLogout} >Logout</button>
                 </div>
            </div>
            <div className="content">
                {isMain ? showCourses() : showNotes()}
            </div>
        </div>


    );
}

export default Mainpage;
