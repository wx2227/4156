import React, { useState } from 'react'
import { Navbar, Nav, Form, FormControl, Button } from 'react-bootstrap'
import DropDown from './DropDown'
import { Link, useHistory } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithubSquare } from '@fortawesome/free-brands-svg-icons'

function CustomLayout (props) {
  const [course, setCourse] = useState('')
  const history = useHistory()

  function handleOnChange (e) {
    if (e && e.target && e.target.value) {
      setCourse(e.target.value)
    }
  }

  function handleClick (event) {
    event.preventDefault()
    if (course !== '') {
      document.getElementById('searchbar').value = ''
      history.push('/airnote/notes/' + course)
    } else {

      // alert('Please input valid course number')
    }
  }

  function handleKeyPress (e) {
    if (e.target.charCode === 13) {
      handleClick(e)
    }
  }

  return (
    <div>
      <Navbar bg='light' style={{ position: 'sticky', top: '0', zIndex: '100' }}>
        <Navbar.Brand href='#home'>AirNote</Navbar.Brand>
        <Nav className='mr-auto'>
          <Nav.Link as={Link} to='/airnote/department'>Home</Nav.Link>
          <Nav.Link as={Link} to='/airnote/courses'>Course</Nav.Link>
          <Nav.Link as={Link} to='/airnote/notes'>Notes</Nav.Link>
          <Nav.Link as={Link} to='/airnote/upload'>Upload</Nav.Link>
        </Nav>
        <Form inline onSubmit={handleClick}>
          <FormControl type='text' placeholder='Search' className='mr-sm-2' onChange={handleOnChange} id='searchbar' />
          <Button variant='outline-dark' style={{ marginRight: '10px' }} onClick={handleClick} onKeyPress={handleKeyPress}>Search</Button>
          <DropDown />
        </Form>
      </Navbar>
      <div style={{ minHeight: '100vh' }}>
        {props.children}
      </div>
      <div style={{ height: '80px', background: '#f0f2f5', display: 'block', flexGrow: '0', padding: '15px 0', textAlign: 'center' }}>
        <div className='pb-1'>AirNote ©2020 Created by Batman&apos;s Kitchen</div>
        <div>
          <a href='https://github.com/wx2227/4156'>
            <FontAwesomeIcon icon={faGithubSquare} size='2x' style={{ color: 'black' }} />
          </a>
        </div>
      </div>
    </div>
  )
}

export default CustomLayout
