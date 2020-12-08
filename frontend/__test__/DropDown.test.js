import React from 'react'
import { shallow } from 'enzyme'
import DropDown from '../src/components/DropDown'
import Cookies from 'js-cookie'

let wrapper
beforeAll(() => {
  wrapper = shallow(<DropDown />)
})

describe('test dropdown component', () => {

  it('test logout button', () => {
    Cookies.set('user_id', 1)
    wrapper.instance().handleLogout()
    expect(Cookies.get('user_id')).toBe(undefined)
  })
})