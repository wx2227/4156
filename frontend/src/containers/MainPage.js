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
   //  const [course, setCourse] = useState(null); 
   // const [isMain, setMain] = useState(true);
    // const [notes, setNotes] = useState(null);

    const [main, setMain] = useState({course: null, isMain: true, notes: null});

    console.log("are we here");
    
    // make search bar sticky on top
    useEffect(
        () => {
            // fetch courses
            updateCourses();
            // update course notes if course is provided 
            if (!main.isMain) {
                updateNotes();
            }
        }, []
    );

    useEffect( 
        () => {
            updateState();
        }, [props.location]
    );

    async function updateState() {
        if (props.location && props.location.state && props.location.state.course && (props.location.state.isMain !== undefined)) {
            const course_number = props.location.state.course;
            const isMainVariable = props.location.state.isMain;
            const notes_requested = await getNotes(course_number);
            setMain({course: course_number, isMain: isMainVariable, notes: notes_requested});
        }
    }

    async function getNotes(course) {
        let notes = null
        const note_request = "http://localhost:8000/api/note/?course_number=" + course;
            await fetch(note_request)
                .then(res => res.json())
                .then(
                    (result) => {
                        notes = result;
                    }).catch(err => {alert("Cannot retrieve notes info")});

        return notes;
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
        if (main.course) {
            const notes = main.notes
            let num = main.course
            if (main.notes) {
                if (main.notes.length === 0) {
                    return (<b>The course has no notes available</b>)
                } else {
                    return (<NoteList course_number={main.course} />);
                }
            } else {
                return (<b>The notes are not retrieved</b>)
            }
        } else {
            return (<b>The course does not exists</b>);
        }

    }


    return (
        <div>
            { main.isMain ? showCourses() : showNotes()}
        </div>
    );
}

export default Mainpage;
