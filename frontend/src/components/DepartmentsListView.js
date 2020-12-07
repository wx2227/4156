import React from 'react'
import axios from '../services/axios'
import { Button, Card, Col, Row, ToggleButton, ToggleButtonGroup, Form, FormControl } from 'react-bootstrap'
import { Link } from 'react-router-dom'

class DepartmentsListView extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      departments: [],
      filter: 'ALL',
      value: 1,
      filtered: []
    }
  }

  componentDidMount (): void {
    return axios.get('http://localhost:8000/api/department')
      .then(res => {
        this.setState({
          ...this.state,
          departments: res.data,
          filtered: res.data
        })
      }).catch(() => alert('cannot get department from server'))
  }

  startsWith2 (haystack, needles) {
    let i = needles.length
    while (i-- > 0) {
      if (haystack.lastIndexOf(needles[i], 0) === 0) { return true }
    }
    return false
  }

  handleDepartments = (e) => {
    const filter = e.target.id
    const departments = this.state.departments
    let filtered = []

    if (filter === 'ALL') {
      this.setState({
        ...this.state,
        filtered: this.state.departments
      })
    } else if (filter === 'A-C') {
      filtered = departments.filter(department => this.startsWith2(department.department_name, ['A', 'B', 'C']))

      this.setState({
        ...this.state,
        filtered: filtered
      })
    } else if (filter === 'D-F') {
      filtered = departments.filter(department => this.startsWith2(department.department_name, ['D', 'E', 'F']))

      this.setState({
        ...this.state,
        filtered: filtered
      })
    } else if (filter === 'G-O') {
      filtered = departments.filter(department => this.startsWith2(department.department_name, ['G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O']))

      this.setState({
        ...this.state,
        filtered: filtered
      })
    } else {
      filtered = departments.filter(department => this.startsWith2(department.department_name, ['P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']))

      this.setState({
        ...this.state,
        filtered: filtered
      })
    }
  }

  handleChange = (e) => {
    const departments = this.state.departments

    const filtered = departments.filter(department => department.department_name.toLowerCase().includes(e.target.value.toLowerCase()))

    this.setState({
      ...this.state,
      filtered: filtered
    })
  }

  showDepartments = () => {
    const departments = this.state.filtered
    let departmentRows = []

    departments.forEach(() => {
      const rows = [...Array(Math.ceil(departments.length / 3))]
      // chunk the notes into the array of rows
      departmentRows = rows.map((row, idx) => departments.slice(idx * 3, idx * 3 + 3))
    })

    return (
      departmentRows.map(row =>
        <Row className='pb-4' key={row.id}>
          {row.map(department =>
            <Col className='col-md-4' key={row.id}>
              <Link to={`/airnote/courses/${department.department_name}`}>
                <Card border='primary' style={{ textDecoration: 'none' }}>
                  <Card.Body style={{ color: 'Black' }}>
                    <Card.Title className='pb-2'>{department.department_name}</Card.Title>
                    <Button variant='outline-success' style={{ width: '130px' }}>{department.courses} Courses</Button>{'  '}
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
    const handleChange = (val) => this.setState({ value: val })

    return (
      <>
        <div className='row justify-content-center'>
          <div className='col-md-8 pt-lg-5'>
            <div className='pb-lg-3 pl-3 pr-3'>
              <Row>
                <h1>List of Departments</h1>
              </Row>
              <Row className='pt-2'>
                <ToggleButtonGroup type='radio' value={this.state.value} onChange={handleChange} name='radio' id='group'>
                  <ToggleButton variant='info' value={1} style={{ fontSize: '20px', textAlign: 'left' }} id='ALL' onClick={this.handleDepartments}>ALL</ToggleButton>
                  <ToggleButton variant='info' value={2} style={{ fontSize: '20px', textAlign: 'left' }} id='A-C' onClick={this.handleDepartments}>A-C</ToggleButton>
                  <ToggleButton variant='info' value={3} style={{ fontSize: '20px', textAlign: 'left' }} id='D-F' onClick={this.handleDepartments}>D-F</ToggleButton>
                  <ToggleButton variant='info' value={4} style={{ fontSize: '20px', textAlign: 'left' }} id='G-O' onClick={this.handleDepartments}>G-O</ToggleButton>
                  <ToggleButton variant='info' value={5} style={{ fontSize: '20px', textAlign: 'left' }} id='P-Z' onClick={this.handleDepartments}>P-Z</ToggleButton>
                </ToggleButtonGroup>
                <div className='ml-auto mr-2'>
                  <Form>
                    <FormControl type='text' placeholder='Search...' className='ml-sm-2' onChange={this.handleChange} />
                  </Form>
                </div>
              </Row>
            </div>
            <h6 className='pb-2'>{this.state.filtered.length} Departments</h6>
            <div align='center'>
              {this.showDepartments()}
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default DepartmentsListView
