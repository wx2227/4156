import React from 'react'
import axios from 'axios'
import { Button, Card, Col, Container, Jumbotron, Row } from 'react-bootstrap'
import AddCourse from './AddCourse'

class DepartmentsListView extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      departments: []
    }
  }

  componentDidMount (): void {
    axios.get('http://localhost:8000/api/department')
      .then(res => {
        this.setState({
          departments: res.data
        })
      }).catch(() => alert('cannot get department from server'))
  }

  render () {
    let departmentRows = []
    this.state.departments.forEach(() => {
      const rows = [...Array(Math.ceil(this.state.departments.length / 3))]
      // chunk the notes into the array of rows
      departmentRows = rows.map((row, idx) => this.state.departments.slice(idx * 3, idx * 3 + 3))
    })

    console.log(departmentRows)

    return (
      <>
        <Jumbotron fluid style={{ background: '#494342' }} className='h-20'>
          <Container>
            <div>
              <h1 className='text-white'>Departments</h1>
            </div>)
            <p>
              <AddCourse />
            </p>
          </Container>
        </Jumbotron>
        <div className='row justify-content-center'>
          <div align='center' className='col-md-8'>
            {
              departmentRows.map(row =>
                <Row className='pb-4' key={row.id}>
                  {row.map(department =>
                    <Col className='col-md-4' key={row.id}>
                      <a href={`/airnote/courses/${department.department_name}`}>
                        <Card border='primary' style={{ textDecoration: 'none' }}>
                          <Card.Body style={{ color: 'Black' }}>
                            <Card.Title>{department.department_name} Department</Card.Title>
                            <Button variant='outline-success' style={{ width: '130px' }}>{department.courses} Courses</Button>{'  '}
                          </Card.Body>
                        </Card>
                      </a>
                    </Col>
                  )}
                </Row>
              )
            }
          </div>
        </div>
      </>
    )
  }
}

export default DepartmentsListView
