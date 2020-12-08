import React from 'react'
import CourseAutoComplete from '../src/components/CourseAutoComplete'
import { shallow } from 'enzyme'

beforeEach(() => {
  jest.clearAllMocks()
})

afterAll(() => {
  jest.clearAllMocks()
})

window.alert = jest.fn()

describe('test course auto complete', () => {
  it('test change action', () => {
    const courses = [{
      course_number: 'test'
    }]

    const handleSelectCourse = jest.fn()

    const wrapper = shallow(<CourseAutoComplete courses={courses} handleSelectCourse={handleSelectCourse} />)

    wrapper.find('ForwardRef').simulate('change', { option: 'test' })

    console.log(wrapper.debug())
  })
})
