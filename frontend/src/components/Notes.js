import React from 'react'
import { Card, Button, Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import 'antd/dist/antd.css'

function Notes (props) {
  let noteRows = []

  props.notes.forEach(() => {
    const rows = [...Array(Math.ceil(props.notes.length / 2))]
    // chunk the notes into the array of rows
    noteRows = rows.map((row, idx) => props.notes.slice(idx * 2, idx * 2 + 2))
  })

  return (
    noteRows.map(row =>
      <Row className='pb-4' key={row.id}>
        {row.map(note =>
          <Col className='col-md-6' key={note.id}>
            <Link to={`/airnote/note/${note.id}`}>
              <Card border='primary' style={{ textDecoration: 'none' }}>
                <Card.Body style={{ color: 'Black' }}>
                  <Card.Title>{note.course_number}</Card.Title>
                  {props.course && <Card.Title style={{}}>{props.course && props.course.course_name}</Card.Title>}
                  <Card.Text>{note.file_name}</Card.Text>
                  <Button variant='outline-success' style={{ width: '120px' }}>{note.up_votes} Likes</Button>{'  '}
                  <Button variant='outline-danger' style={{ width: '120px' }}>{note.down_votes} Dislikes</Button>{'  '}
                  <Button variant='outline-info' style={{ width: '120px' }}>{note.comments.length} Comments</Button>{'  '}
                  <Button variant='outline-warning' style={{ width: '120px' }}>{note.favorites.length} Favorites</Button>{'  '}
                </Card.Body>
              </Card>
            </Link>
          </Col>
        )}
      </Row>
    )
  )
}

export default Notes
