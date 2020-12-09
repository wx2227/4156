import React from 'react'
import { Form, Button, Col, Row } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import axios from 'axios'

class AddCourseView extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      courseNumber: '',
      courseName: '',
      term: '2020 Fall',
      departmentName: 'Computer Science Department'
    }
  }

  handleSubmit (e) {
    e.preventDefault()

    const form = e.currentTarget

    if (form.checkValidity() === false) {
      e.stopPropagation()
    } else {
      axios.post('http://127.0.0.1:8000/api/course/', {
        course_number: this.state.courseNumber,
        course_name: this.state.courseName,
        term: this.state.term,
        department_name: this.state.departmentName
      }).then(res => {
        history.push('/airnote/courses/' + res.data.department_name)
      }).catch(() => alert('cannot delete note'))
    }
  }

  render () {
    return (
      <div style={{ height: '80vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }} id='div'>
        <Form className='card bg-white col-md-6' onSubmit={(e) => this.handleSubmit(e)} id='form'>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', background: '#17A2B8', height: '80px' }}>
            <h1 className='text-white m-0 p-0'>Add Course</h1>
          </div>
          <div className='pl-lg-3 pr-lg-3'>
            <div className='pl-lg-5 pr-lg-5 pb-4 pt-4'>
              <Form.Group>
                <Form.Row className='pb-3'>
                  <Form.Label column='lg'>Course Number</Form.Label>
                  <Col className='col-md-9'>
                    <Form.Control
                      required size='lg' placeholder='COMS 4156' id='course_number'
                      onChange={(e) => this.setState({ ...this.state, courseNumber: e.target.value })}
                    />
                  </Col>
                </Form.Row>
              </Form.Group>
              <Form.Group>
                <Form.Row className='pb-3'>
                  <Form.Label column='lg'>Course Name</Form.Label>
                  <Col className='col-md-9'>
                    <Form.Control
                      required size='lg' placeholder='Advanced Software Engineering' id='course_name'
                      onChange={(e) => this.setState({ ...this.state, courseName: e.target.value })}
                    />
                  </Col>
                </Form.Row>
              </Form.Group>
              <Form.Group>
                <Form.Row className='pb-3'>
                  <Form.Label column='lg'>Term</Form.Label>
                  <Col className='col-md-9'>
                    <Form.Control
                      size='lg' as='select' id='term'
                      onChange={(e) => this.setState({ ...this.state, term: e.target.value })}
                    >
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
                    <Form.Control
                      size='lg' as='select' id='department_name'
                      onChange={(e) => this.setState({ ...this.state, departmentName: e.target.value })}
                    >
                      <option>Computer Science Department</option>
                      <option>Data Science</option>
                      <option>Electrical Engineering</option>
                    </Form.Control>
                  </Col>
                </Form.Row>
              </Form.Group>
              <Row className='row justify-content-center'>
                <Col className='col-md-5'>
                  <Button variant='outline-success' className='w-100' type='submit' id='submit'>Submit</Button>{' '}
                </Col>
                <Col className='col-md-5'>
                  <Button
                    variant='outline-success' className='w-100' onClick={() => {
                      this.props.onCancel()
                      useHistory().push('/airnote/courses')
                    }} id='cancel'
                  >Cancel
                  </Button>
                </Col>
              </Row>
            </div>
          </div>
        </Form>
      </div>
    )
  }
}

export default AddCourseView
