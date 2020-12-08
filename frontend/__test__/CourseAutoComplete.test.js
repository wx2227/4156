import React from 'react'
import CourseAutoComplete from '../src/components/CourseAutoComplete'
import { shallow } from 'enzyme'

describe( 'test course auto complete', () => {

  it ('test change action', () => {
    const courses = [{
      course_number: 'test'
    }]

    const handleSelectCourse = jest.fn()

    let wrapper = shallow(<CourseAutoComplete courses={courses} handleSelectCourse={handleSelectCourse}/>)

    wrapper.find('ForwardRef').simulate('change', {option: 'test'})

    console.log(wrapper.debug())
  })
})