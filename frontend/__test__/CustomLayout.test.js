import React from 'react'
import { shallow } from 'enzyme'
import CustomLayout from '../src/components/CustomLayout'

jest.mock('react-router-dom', () => ({
  useHistory: () => ({
    push: jest.fn()
  }),
}));

beforeEach(() => {
  jest.clearAllMocks();
})

afterAll(() => {
  jest.clearAllMocks();
})

window.alert = jest.fn();

let wrapper

describe('test custom layout', () => {

  beforeAll(() => {
    wrapper = shallow(<CustomLayout/>)
  })

  it ('simulate change action', () => {
    wrapper.find('FormControl').simulate('change', {
      target: {
        value: 1
      }
    })
  })

  it ('simulate change action without target', () => {
    wrapper.find('FormControl').simulate('change', {})
  })

  it ('simulate click action with valid course', () => {
    document.getElementById = jest.fn(() => {return {value: 'test'}})

    wrapper.find('FormControl').simulate('change', {
      target: {
        value: "1"
      }
    })

    wrapper.find('Button').simulate('click', {
      preventDefault: () => {}
    })
  })

  it ('simulate click action with not valid course', () => {
    wrapper = shallow(<CustomLayout/>)

    wrapper.find('Button').simulate('click', {
      preventDefault: () => {}
    })
  })

  it ('test enable search with enter key press', () => {
    wrapper.find('FormControl').simulate('change', {
      target: {
        value: '1'
      }
    })
    wrapper.find('Button').simulate('keypress', {
      target: {
        charCode: 13
      },
      preventDefault: () => {}
    })
  })

  it ('test enable search only with enter key press not other key', () => {
    wrapper.find('Button').simulate('keypress', {
      target: {
        charCode: 14
      },
      preventDefault: () => {}
    })
  })
})