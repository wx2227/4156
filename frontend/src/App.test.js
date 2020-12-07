import React from 'react'
import { MemoryRouter } from 'react-router'
import { mount, shallow } from 'enzyme'
import App from './App'
import LoginPage from './containers/googleLogin'
import Cookie from 'js-cookie'
import {Router, Route } from 'react-router-dom'
import BaseRouter from './routes'
import CustomLayout from './components/CustomLayout'
import {Badge } from 'react-bootstrap'


describe('routes using memory router', () => {
  it('Should show CoursePage component for /airnote/courses router', () => {
    const component = mount(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    )
    expect(component.find(LoginPage)).toHaveLength(1)
  })

})



describe('Auth depends on cookies user_id and token', () => {

 

  it('With no cookies, auth should be false', () => {
   Cookie.get = jest.fn()
    .mockImplementationOnce(() => null) // first time
 
    const wrapper = shallow(<App />)
    // console.log(wrapper.debug());
    expect(wrapper.contains(<BaseRouter />)).toEqual(false)
  })



  it('With cookies `User`, auth should be true', () => {
   Cookie.get = jest.fn()
    .mockImplementationOnce(() => null) // second time
    .mockImplementationOnce(() => "user_id") // second time
    .mockImplementationOnce(() => "token") // second time
 
    const wrapper = shallow(<App />)
    // console.log(wrapper.debug());
    expect(wrapper.contains(<BaseRouter />)).toEqual(true)
  })
})