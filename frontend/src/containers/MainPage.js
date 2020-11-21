import React from 'react'
import axios from 'axios'
// import './MainPage.css'
import { Button, Card, CardColumns, Container, Jumbotron } from 'react-bootstrap'

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
    return (
      <CardColumns style={{ width: '100rem' }}>
        {
              this.state.courses.map((course) =>
                <a key={course.id} href={'/airnote/notes/' + course.course_number}>
                  <Card style={{ width: '30rem', textDecoration: 'none' }}>
                    <Card.Body style={{ color: 'Black' }}>
                      <Card.Title>{course.course_number}</Card.Title>
                      <Card.Title>{course.course_name}</Card.Title>
                      <Button variant='outline-success' style={{ width: '20rem' }}>{course.notes.length} Notes</Button>{' '}
                    </Card.Body>
                  </Card>
                </a>
              )
}
      </CardColumns>
    )
  }

  render () {
    return (
      <div>
        <Jumbotron fluid style={{ background: '#494342' }}>
          <Container>
            <h1 className='text-white'>Department of {this.state.department}</h1>
            <p>
              <Button variant='outline-success' style={{ marginRight: '10px' }} onClick={this.handleClick}>+ Add Course</Button>
            </p>
          </Container>
        </Jumbotron>
        <div className='row justify-content-md-center' style={{minHeight: 700 }}>
          <div align='center' className='col-md-8'>
            {this.state.courses && this.showCourses()}
          </div>
        </div>
      </div>
    )
  }
}

export default Mainpage
