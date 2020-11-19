import React from 'react'
import { Layout } from 'antd'
import { Navbar, Nav, Form, FormControl, Button } from 'react-bootstrap'
import '../containers/MainPage.css'
import { withRouter } from 'react-router-dom'
import Cookies from 'js-cookie'

const { Footer } = Layout

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
        <>
          <Navbar bg='primary' variant='dark' style={{ position: 'sticky', top: '0', zIndex: '100' }}>
            <Navbar.Brand href='#home'>AirNote</Navbar.Brand>
            <Nav className='mr-auto'>
              <Nav.Link href='/airnote/main'>Home</Nav.Link>
              <Nav.Link href='/airnote/notes'>Notes</Nav.Link>
              <Nav.Link href='/airnote/upload'>Upload</Nav.Link>
            </Nav>
            <Form inline>
              <FormControl type='text' placeholder='Search' className='mr-sm-2' onChange={this.handleOnChange} />
              <Button variant='outline-light' style={{ marginRight: '10px' }} onClick={this.handleClick}>Search</Button>
              <Button variant='danger' style={{ width: '80px' }} onClick={this.handleLogout}>Logout</Button>
            </Form>
          </Navbar>
          <div style={{ top: 20, background: '#fff', padding: 24, minHeight: 500 }}>
            {this.props.children}
          </div>
          <Footer style={{ bottom: '0' }}>
            Ant Design ©2016 Created by Ant UED
          </Footer>
        </>
      )
    }
}

export default withRouter(CustomLayout)
