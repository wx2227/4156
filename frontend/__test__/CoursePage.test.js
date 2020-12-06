import CoursePage from '../src/containers/CoursePage'
import React from 'react'
import { shallow } from 'enzyme';

const COURSES_ENDPOINT = 'http://localhost:8000/api/course/';
const COURSE_ENDPOINT = 'http://localhost:8000/api/course/?department_name=Computer Science Department'
const NONE_ENDPOINT = 'http://localhost:8000/api/course/?department_name=Computer Department'

jest.mock('axios', () => {
  const courses = {
    'data':
      [
        {
          "course_number": "COMS 4156",
          "notes": [
            5,
            7
          ],
          "department_info": {
            "department_name": "Computer Science Department",
            "url": "https://www.columbia.edu/content/computer-science-department"
          },
          "course_name": "Advanced Software Engineering",
          "term": "2020 Fall",
          "department_name": "Computer Science Department"
        }]
  }
  const course = courses
  const none = {'data': []}

  return {
    get: jest.fn((url) => {
      switch(url) {
        case COURSES_ENDPOINT:
          return Promise.resolve(courses)
        case COURSE_ENDPOINT:
          return Promise.resolve(course)
        case NONE_ENDPOINT:
          return Promise.resolve(none)
      }
    }),
  };
});

const axios = require('axios');

let wrapper;

describe('test CoursePage rendering', () => {

  test('test basic CoursePage rendering', () => {
    const match = { params: { department_name: undefined } }
    const component = shallow(<CoursePage match={match} />)

    component
      .instance()
      .componentDidMount()
      .then(() => {
        expect(axios.get).toHaveBeenCalled();
        expect(wrapper).toMatchSnapshot();
      })
  })

  it('CoursePage queryParams snapshot test', () => {
    const match = { params: { department_name: 'Computer Science Department' } }
    const component = shallow(<CoursePage match={match} />)

    component
      .instance()
      .componentDidMount()
      .then(() => {
        expect(axios.get).toHaveBeenCalled();
        expect(wrapper).toMatchSnapshot();
      })
  });

  it('CoursePage queryParams snapshot zero length test', () => {
    const match = { params: { department_name: 'Computer Department' } }
    const component = shallow(<CoursePage match={match} />)

    component
      .instance()
      .componentDidMount()
      .then(() => {
        expect(axios.get).toHaveBeenCalled();
        expect(wrapper).toMatchSnapshot();
      })
  });
})