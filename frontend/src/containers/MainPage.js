import React, { useState, useEffect } from 'react'

import './MainPage.css'
import { Card, CardColumns, Container } from 'react-bootstrap'

function Mainpage () {
  const [courses, setCourses] = useState(null)

  // make search bar sticky on top
  useEffect(
    () => {
      // fetch courses
      updateCourses()
      // update course notes if course is provided
    }, []
  )

  async function updateCourses () {
    // fetch courses
    await fetch('http://localhost:8000/api/course/')
      .then(res => res.json())
      .then(
        (result) => {
          setCourses(result)
        }).catch(err => { console.log(err.stack) })
  }

  const showCourses = () => {
    return (
      <CardColumns style={{ width: '70rem' }}>{courses.map((course) =>
        <a key={course.id} href={'/airnote/notes/' + course.course_number}>
          <Card style={{ width: '18rem', textDecoration: 'none' }}>

            <Card.Img variant='top' style={{ width: '286px', height: '180px' }} className='img-fluid' src='https://picsum.photos/286/180' />
            <Card.Body style={{ color: 'Black' }}>
              <Card.Title>{course.course_number}</Card.Title>
              <Card.Text>
                {course.course_name}
              </Card.Text>
            </Card.Body>
          </Card>

        </a>

      )}
      </CardColumns>
    )
  }

  return (
    <Container>
      {courses && showCourses()}
    </Container>
  )
}

export default Mainpage
