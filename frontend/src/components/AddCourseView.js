import React from 'react'
import { Form, Button, Col, Row } from 'react-bootstrap'
import axios from '../services/axios'

class AddCourseView extends React.Component {
  constructor (props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.state = {
      validated: false
    }
  }

  handleSubmit = (e) => {
    const form = e.currentTarget

    e.preventDefault()

    if (form.checkValidity() === false) {
      e.stopPropagation()
    }

    this.setState({
      validated: true
    })

    const courseNumber = document.getElementById('course_number').value
    const courseName = document.getElementById('course_name').value
    const term = document.getElementById('term').value
    const departmentName = document.getElementById('department_name').value

    axios.post('http://127.0.0.1:8000/api/course/', {
      course_number: courseNumber,
      course_name: courseName,
      term: term,
      department_name: departmentName
    }).then(res => {
      console.log(res)
      window.location.href = '/airnote/courses/' + res.data.department_name
    }).catch((error) => {
      if (error.response) {
        alert(error.response.data.course_number)
      }
    })
  }

  render () {
    return (
      <>
        <div style={{ height: '80vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div className='col-md-6'>
            <Form className='card bg-white' onSubmit={this.handleSubmit}>
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', background: '#17A2B8', height: '80px' }}>
                <h1 className='text-white m-0 p-0'>Add Course</h1>
              </div>
              <div className='pl-lg-3 pr-lg-3'>
                <div className='pl-lg-5 pr-lg-5 pb-4 pt-4'>
                  <Form.Group>
                    <Form.Row className='pb-3'>
                      <Form.Label column='lg'>Course Number</Form.Label>
                      <Col className='col-md-9'>
                        <Form.Control required size='lg' placeholder='COMS 4156' id='course_number' />
                      </Col>
                    </Form.Row>
                  </Form.Group>
                  <Form.Group>
                    <Form.Row className='pb-3'>
                      <Form.Label column='lg'>Course Name</Form.Label>
                      <Col className='col-md-9'>
                        <Form.Control required size='lg' placeholder='Advanced Software Engineering' id='course_name' />
                      </Col>
                    </Form.Row>
                  </Form.Group>
                  <Form.Group>
                    <Form.Row className='pb-3'>
                      <Form.Label column='lg'>Term</Form.Label>
                      <Col className='col-md-9'>
                        <Form.Control size='lg' as='select' id='term'>
                          <option>2020 Fall</option>
                          <option>2020 Summer</option>
                          <option>2020 Spring</option>
                          <option>2019 Fall</option>
                          <option>2019 Spring</option>
                        </Form.Control>
                      </Col>
                    </Form.Row>
                  </Form.Group>
                  <Form.Group>
                    <Form.Row className='pb-3'>
                      <Form.Label column='lg'>Department Name</Form.Label>
                      <Col className='col-md-9'>
                        <Form.Control size='lg' as='select' id='department_name'>
                          <option>Computer Science Department</option>
                          <option>Data Science</option>
                          <option>Electrical Engineering</option>
                        </Form.Control>
                      </Col>
                    </Form.Row>
                  </Form.Group>
                  <Row className='row justify-content-center'>
                    <Col className='col-md-5'>
                      <Button variant='outline-success' className='w-100' type='submit'>Submit</Button>{' '}
                    </Col>
                    <Col className='col-md-5'>
                      <Button variant='outline-success' className='w-100'>Cancel</Button>
                    </Col>
                  </Row>
                </div>
              </div>
            </Form>
          </div>
        </div>
      </>
    )
  }
}

export default AddCourseView
