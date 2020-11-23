import React from 'react'
import { Button, Dropdown } from 'react-bootstrap'
import Cookies from 'js-cookie'

class DropDown extends React.Component {
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
        <Dropdown>
          <Dropdown.Toggle variant='light'>
            <img src={Cookies.get('url')} className='img-fluid' style={{ width: '40px', height: '40px' }} />{' '}
            {`${Cookies.get('firstname')} ${Cookies.get('lastname')}`}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item>
              <Button variant='danger' onClick={this.handleLogout} className='w-100'>Logout</Button>
            </Dropdown.Item>
            <Dropdown.Item href='/airnote/profile'>Student Profile</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    )
  }
}

export default DropDown
