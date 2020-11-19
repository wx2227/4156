
import React from 'react'
import { List } from "antd";
import { Row, Col, Divider } from 'antd';
import { Card, ListGroup } from 'react-bootstrap';
import 'antd/dist/antd.css';
import './Notes.css';


function Notes(props) {
    let noteRows = []
    props.notes.map(() =>{
        const rows = [...Array( Math.ceil(props.notes.length / 2) )];
        // chunk the notes into the array of rows
        noteRows = rows.map( (row, idx) => props.notes.slice(idx * 2, idx * 2 + 2) );
    })
    return (
        <div className={"notes-view-wrapper"}>
            <ListGroup horizontal={'xl'} className="my-2" key={idx}>
                noteRows.map( row =>
                    row.map(note => {
                        <ListGroup.Item>
                            <Card style={{ width: '18rem' }}>
                                <Card.Body>
                                    <Card.Link href={`/airnote/note/${note.id}`}>{props.course.course_number}</Card.Link>
                                    <Card.Link href={`/airnote/note/${note.id}`}>{props.course.course_name}</Card.Link>
                                    <Card.Text>{props.course.department_name}</Card.Text>
                                    <Card.Text>note.up_votes</Card.Text>
                                    <Card.Text>note.down_votes</Card.Text>
                                </Card.Body>
                            </Card>
                        </ListGroup.Item>}
                    )
                )
            </ListGroup>
        </div>
    );
}

export default Notes;
