import React from 'react'
import { Navbar, Nav, Form, FormControl, Button } from 'react-bootstrap'
import '../containers/MainPage.css'
import DropDown from './DropDown'
import { withRouter } from 'react-router-dom'
import Cookies from 'js-cookie'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithubSquare } from '@fortawesome/free-brands-svg-icons'

class CustomLayout extends React.Component {
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

    handleLogout = () => {
      Cookies.remove('user_id')
      Cookies.remove('token')
      Cookies.remove('firstname')
      Cookies.remove('lastname')
      window.location.href = '/'
    }

    render () {
      return (
        <div>
          <Navbar bg='light' style={{ position: 'sticky', top: '0', zIndex: '100' }}>
            <Navbar.Brand href='#home'>AirNote</Navbar.Brand>
            <Nav className='mr-auto'>
              <Nav.Link href='/airnote/main'>Home</Nav.Link>
              <Nav.Link href='/airnote/notes'>Notes</Nav.Link>
              <Nav.Link href='/airnote/upload'>Upload</Nav.Link>
            </Nav>
            <Form inline>
              <FormControl type='text' placeholder='Search' className='mr-sm-2' onChange={this.handleOnChange} />
              <Button variant='outline-dark' style={{ marginRight: '10px' }} onClick={this.handleClick}>Search</Button>
              <DropDown />
              {/* <Button variant='danger' style={{ width: '80px' }} onClick={this.handleLogout}>Logout</Button> */}
            </Form>
          </Navbar>
          <div style={{ minHeight: '100vh' }}>
            {this.props.children}
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
}

export default withRouter(CustomLayout)
