import React from 'react'
import { Button, Dropdown, Image } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Cookies from 'js-cookie'

class DropDown extends React.Component {
  handleLogout = () => {
    Cookies.remove('user_id')
    Cookies.remove('token')
    Cookies.remove('firstname')
    Cookies.remove('lastname')
    Cookies.remove('Authorization')
    window.location.href = '/'
  }

  render () {
    return (
      <div>
        <Dropdown>
          <Dropdown.Toggle variant='light'>
            <Image src={Cookies.get('url')} className='img-fluid' roundedCircle style={{ width: '40px', height: '40px' }} />{' '}
            {`${Cookies.get('firstname')} ${Cookies.get('lastname')}`}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item>
              <Button variant='danger' onClick={this.handleLogout} className='w-100'>Logout</Button>
            </Dropdown.Item>
            <Dropdown.Item as={Link} to='/airnote/profile'>Student Profile</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    )
  }
}

export default DropDown
