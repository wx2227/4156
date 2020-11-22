import React from 'react'
import axios from 'axios'
// import './MainPage.css'
import { Button, Card, CardColumns, Container, Jumbotron, Row, Col } from 'react-bootstrap'

class Mainpage extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      courses: [],
      department: ''
    }
  }

  componentDidMount (): void {
    axios.get('http://localhost:8000/api/course/')
      .then(res => {
        if (res.data.length !== 0) {
          this.setState({
            courses: res.data,
            department: res.data[0].department_name
          })
        }
      }).catch(err => { console.log(err.stack) })
  }

  showCourses = () => {
    const courses = this.state.courses
    let courseRows = []
    courses.forEach(() => {
      const rows = [...Array(Math.ceil(courses.length / 2))]
      // chunk the notes into the array of rows
    courseRows = rows.map((row, idx) => this.state.courses.slice(idx * 2, idx * 2 + 2))
    })

    return (
      courseRows.map(row =>
        <Row className='pb-4'>
          {row.map(course =>
            <Col className={'col-md-6'}>
              <a key={course.id} href={'/airnote/notes/' + course.course_number}>
                <Card>
                  <Card.Body style={{ color: 'Black', width: '538px' }}>
                    <Card.Title>{course.course_number}</Card.Title>
                    <Card.Title>{course.course_name}</Card.Title>
                    <Button variant='outline-success' style={{width: '300px'}}>{course.notes.length} Notes</Button>{' '}
                  </Card.Body>
                </Card>
              </a>
            </Col>
            )
          }
        </Row>
      )
    )
  }

  render () {
    return (
      <>
        <Jumbotron fluid style={{ background: '#494342' }}>
          <Container>
            <h1 className='text-white'>Department of {this.state.department}</h1>
            <p>
              <Button variant='outline-success' style={{ marginRight: '10px' }} onClick={this.handleClick}>+ Add Course</Button>
            </p>
          </Container>
        </Jumbotron>
        <div className="row justify-content-center">
          <div align='center' className='col-md-8'>
            {this.state.courses && this.showCourses()}
          </div>
        </div>
        {/*<div className='col-md-8' style={{minHeight: 700 , display: 'flex', justifyContent: 'center', width: '100%', height: '100%'}}>*/}
        {/*</div>*/}
      </>
    )
  }
}

export default Mainpage
