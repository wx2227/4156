import React from 'react'
import { MemoryRouter } from 'react-router'
import { mount } from 'enzyme'
import App from './App'
import LoginPage from './containers/googleLogin'

describe('routes using memory router', () => {
  it('should show CoursePage component for /airnote/courses router', () => {
    const component = mount(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    )
    expect(component.find(LoginPage)).toHaveLength(1)
  })
})
