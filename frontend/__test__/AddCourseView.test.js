import React from 'react'
import { shallow, mount } from 'enzyme';
import AddCourseView from '../src/components/AddCourseView'

jest.mock('axios', () => {
  return {
    post: jest.fn(() => Promise.resolve())
  };
});

jest.mock('react-router-dom', () => ({
  useHistory: () => ({
    push: jest.fn()
  }),
}));

const axios = require('axios')

let wrapper;

describe('test can input value into fields of form', () => {

  beforeEach(() => {
    wrapper = shallow(<AddCourseView />)
  })

  it ('test input course number', () => {
   wrapper.find('#course_number').simulate('change', {'target': {'value': 'CSOR 4231'}})
   expect(wrapper.state('courseNumber')).toBe('CSOR 4231')
  })

  it ('test input course name', () => {
    wrapper.find('#course_name').simulate('change', {'target': {'value': 'analysis of algorithm'}})
    expect(wrapper.state('courseName')).toBe('analysis of algorithm')
  })

  it ('test select term', () => {
    wrapper.find('#term').simulate('change', {'target': {'value': '2019 Fall'}})
    expect(wrapper.state('term')).toBe('2019 Fall')
  })

  it ('test select department', () => {
    wrapper.find('#department_name').simulate('change', {'target': {'value': 'computer science'}})
    expect(wrapper.state('departmentName')).toBe('computer science')
  })
})

describe('test submit form', () => {

  it ('submit button work', () => {
    const onSubmitSpy = jest.fn();
    wrapper = mount(<AddCourseView onSubmit={onSubmitSpy}/>)

    wrapper.find('#form').find('form').simulate('submit')

    expect(onSubmitSpy).toHaveBeenCalled()
    expect(axios.post).toHaveBeenCalled()
  })
})

describe('test cancel form', () => {

  it ('cancel button work', () => {
    const onCancelSpy = jest.fn();
    wrapper = mount(<AddCourseView onCancel={onCancelSpy}/>)

    wrapper.find('#cancel').find('button').simulate('click')

    expect(onCancelSpy).toHaveBeenCalled()
  })
})

// describe('test axios post', () => {
//
//   it ('axios with catch', () => {
//     const onSubmitSpy = jest.fn(() => Promise.resolve());
//     wrapper = mount(<AddCourseView onSubmit={onSubmitSpy}/>)
//
//     axios.post.mockRejectedValueOnce(new Error('error'));
//
//     wrapper.find('#form').find('form').simulate('submit')
//
//     console.log()
//
//     return onSubmitSpy.catch(() => {
//     })
//       .then(() => expect(onSubmitSpy)).toHaveBeenCalledTimes(1)
//   })
// })


