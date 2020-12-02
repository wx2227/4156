import React from 'react'
import { Button, Form, FormControl, Navbar } from 'react-bootstrap'
import DropDown from './DropDown'
import axios from '../services/axios'

class CourseSearch extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      course: null
    }
  }

  handleOnChange = (e) => {
    let value = null
    if (e && e.target && e.target.value) {
      value = e.target.value
    } else {
      return
    }

    this.setState(() => ({
      course: value
    }))
  }

  handleClick = () => {
    if (this.state.course) {
      window.location.href = '/airnote/notes/' + this.state.course
    } else {
      alert('Please input valid course number')
    }
  }

  render () {
    return (
      <Form inline>
        <FormControl type='text' placeholder='Search' className='mr-sm-2' onChange={this.handleOnChange} />
        <Button variant='outline-dark' style={{ marginRight: '10px' }} onClick={this.handleClick}>Search</Button>
        <DropDown />
      </Form>
    )
  }
}

export default CourseSearch
