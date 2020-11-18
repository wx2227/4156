import React from 'react'
import { Component, useState, useEffect} from 'react'
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import { useHistory} from "react-router-dom";
import { useLocation } from "react-router-dom";
import "./MainPage.css";
import axios from 'axios';
import NoteList from '../components/NotesListView';



function Mainpage(props) {
    console.log("------");
    console.log("are we here");
    const [courses, setCourses] = useState(null);
    const [course, setCourse] = useState(null); 
    const [isMain, setMain] = useState(true);
    const [notes, setNotes] = useState(null);

    
    // make search bar sticky on top
    useEffect(
        () => {
            // fetch courses
            updateCourses();
            // update course notes if course is provided 
            if (!isMain) {
                updateNotes();
            }
        }, []
    );

    useEffect( 
        () => {
            if (props.location && props.location.state && props.location.state.course && (props.location.state.isMain !== undefined)) {
                setCourse(props.location.state.course, setMain(props.location.state.isMain, updateNotes())); 
            }
            console.log("here");
        }, [props.location]
    );

    async function updateNotes() {
        console.log(course);
        const note_request = "http://localhost:8000/api/note/?course_number=" + course;
            await fetch(note_request)
                .then(res => res.json())
                .then(
                    (result) => {
                        setNotes(notes_requested);
                    }).catch(err => {alert("Cannot retrieve notes info")});
    }

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

    const showNotes = () => {
        if (course) {
            let num = course
            if (notes.length === 0) {
                return (<b>The course has no notes available</b>)
            } else {
                return (<NoteList notes={notes} />);
            }
        } else {
            return (<b>The course does not exists</b>);
        }

    }


    return (
        <div>
            {isMain ? showCourses() : showNotes()}
        </div>
    );
}

export default Mainpage;
