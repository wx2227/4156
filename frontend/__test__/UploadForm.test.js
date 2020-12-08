import React from 'react'
import { mount, shallow } from 'enzyme'
import UploadForm from '../src/components/UploadForm.js'
import Cookie from 'js-cookie'
import axios from 'axios'

window.alert = jest.fn(); 
jest.mock('axios')
beforeEach(() => {
    jest.clearAllMocks();
})

afterAll(() => {
    jest.clearAllMocks();
})


describe('check default render content', () => {

  it('default should contains label with course number', () => {
    axios.get.mockImplementationOnce((url) => {
      return Promise.resolve({data: "tmp"})
    })

    let wrapper = shallow(<UploadForm />)
    expect(wrapper.contains(<label htmlFor='courseNumber'>Course Number</label>)).toBe(true)
  })

})



describe('Unit tests', () => {

  it('handleSelectCourse should set selected course' , async () => {
    axios.get.mockImplementationOnce((url) => {
      return Promise.resolve({data: "tmp"})
    })

    let wrapper = shallow(<UploadForm />)
    let instance = wrapper.instance()
    await instance.handleSelectCourse([2])
    expect(instance.state.selectedCourse).toBe(2)
  })


  it('handleSelectCourse should not set selected course with invalid event' , async () => {
    axios.get.mockImplementationOnce((url) => {
      return Promise.resolve({data: "tmp"})
    })

    let wrapper = shallow(<UploadForm />)
    let instance = wrapper.instance()
    await instance.setState({selectedCourse: 3})
    await instance.handleSelectCourse([])
    expect(instance.state.selectedCourse).toBe(3)
  })


    it('toBase64 should return Promise' , async () => {
    axios.get.mockImplementationOnce((url) => {
      return Promise.resolve({data: "tmp"})
    })

    let wrapper = shallow(<UploadForm />)
    let instance = wrapper.instance()
    expect(instance.toBase64("fakeUrl")).toBeInstanceOf(Promise)
  })


    it('isCourseValid returns true when coursenumber is valid, return false when its invalid' , async () => {

    axios.get.mockImplementationOnce((url) => {
      return Promise.resolve({data: "tmp"})
    }).mockImplementationOnce((url) => {
      return Promise.resolve({data: [{course_number: 4156}]})
    }).mockImplementationOnce((url) => {
      return Promise.resolve({data: [{course_number: 4156}]})
    })

    let wrapper = shallow(<UploadForm />)
    let instance = wrapper.instance()
    expect(await instance.isCourseNumberValid(4156)).toBe(true)
    expect(await instance.isCourseNumberValid(4186)).toBe(false)
  })


    it('UploadFile returns alert when file undefined' , async () => {
    axios.get.mockImplementationOnce((url) => {
      return Promise.resolve({data: "tmp"})
    })
    jest.spyOn(document, 'getElementById').mockReturnValueOnce({ files: []});
    let wrapper = shallow(<UploadForm />)
    let instance = wrapper.instance()
    expect(await instance.uploadFile()).toBe(undefined)
  })

    it('UploadFile returns alert when file not pdf' , async () => {
    axios.get.mockImplementationOnce((url) => {
      return Promise.resolve({data: "tmp"})
    })
    jest.spyOn(document, 'getElementById').mockReturnValue({ files: [{type: "text"}]});
    let wrapper = shallow(<UploadForm />)
    let instance = wrapper.instance()
    expect(await instance.uploadFile()).toBe(undefined)
  })


    it('UploadFile should proceed with valid pdf' , async () => {

  })
})