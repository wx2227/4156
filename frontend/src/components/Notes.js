import React from 'react'
import { Card, CardColumns, Button } from 'react-bootstrap'

import 'antd/dist/antd.css'

function Notes (props) {
  let noteRows = []

  props.notes.forEach(() => {
    const rows = [...Array(Math.ceil(props.notes.length / 2))]
    // chunk the notes into the array of rows
    noteRows = rows.map((row, idx) => props.notes.slice(idx * 2, idx * 2 + 2))
  })

  return (
    <CardColumns style={{ width: '100rem' }}>
      {
                props.notes.map(note =>
                  <a href={`/airnote/note/${note.id}`}>
                    <Card border='primary' style={{ width: '30rem', textDecoration: 'none' }}>
                      <Card.Body style={{ color: 'Black' }}>
                        <Card.Title>{note.course_number}</Card.Title>
                        {props.course && <Card.Title style={{ height: '3rem' }}>{props.course && props.course.course_name}</Card.Title>}
                        <Card.Text>{note.file_name}</Card.Text>
                        <Button variant='outline-success' style={{ width: '8rem' }}>{note.up_votes} Likes</Button>{' '}
                        <Button variant='outline-danger' style={{ width: '8rem' }}>{note.down_votes} Dislikes</Button>{' '}
                        <Button variant='outline-info' style={{ width: '8rem' }}>{note.comments.length} Comments</Button>{' '}
                      </Card.Body>
                    </Card>
                  </a>
                )
            }
    </CardColumns>
  )
}

export default Notes
