import React from 'react'
import axios from 'axios'
import { Button, Card, Container, Jumbotron, Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import AddCourse from '../components/AddCourse'

class CoursePage extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      courses: [],
      department: '',
      url: ''
    }
  }

  componentDidMount (): void {
    const departmentName = this.props.match.params.department_name

    if (departmentName === undefined) {
      return axios.get('http://localhost:8000/api/course/')
        .then(res => {
          this.setState({
            courses: res.data
          })
        })
    } else {
      return axios.get(`http://localhost:8000/api/course/?department_name=${departmentName}`)
        .then(res => {
          if (res.data.length !== 0) {
            this.setState({
              courses: res.data,
              url: res.data[0].department_info.url,
              departmentName: departmentName
            })
          } else {
            this.setState({
              ...this.state,
              departmentName: departmentName
            })
          }
        })
    }
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
        <Row className='pb-4' key={row.id}>
          {row.map(course =>
            <Col className='col-md-6' key={course.id}>
              <Link to={'/airnote/notes/' + course.course_number}>
                <Card>
                  <Card.Body style={{ color: 'Black', width: '538px' }}>
                    <Card.Title>{course.course_number}</Card.Title>
                    <Card.Title>{course.course_name}</Card.Title>
                    <Button variant='outline-success' style={{ width: '300px' }}>{course.notes.length} Notes</Button>{' '}
                  </Card.Body>
                </Card>
              </Link>
            </Col>
          )}
        </Row>
      )
    )
  }

  render () {
    return (
      <>
        <Jumbotron fluid style={{ background: '#494342' }}>
          <Container>
            {
              this.state.departmentName
                ? (
                  <div>
                    <h1 className='text-white'>{this.state.departmentName}</h1>
                    <p className='pb-3'>
                      <a href={this.state.url} className='text-light' style={{ fontSize: '18px' }}>{this.state.url}</a>
                    </p>
                  </div>)
                : (<h1 className='text-white'>Courses</h1>)
            }
            <p>
              <AddCourse />
            </p>
          </Container>
        </Jumbotron>
        <div className='row justify-content-center'>
          <div align='center' className='col-md-8'>
            {this.state.courses && this.showCourses()}
          </div>
        </div>
      </>
    )
  }
}

export default CoursePage
