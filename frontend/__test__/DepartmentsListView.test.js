import CoursePage from '../src/containers/CoursePage'
import React from 'react'
import { shallow } from 'enzyme';
import sinon from 'sinon';
import DepartmentsListView from '../src/components/DepartmentsListView'

const departments = {
  'data':
    [
      {
        "department_name": "Accounting Division",
        "courses": 0,
        "url": "https://www.columbia.edu/content/accounting-division"
      },
      {
        "department_name": "Computer Science Department",
        "courses": 4,
        "url": "https://www.columbia.edu/content/computer-science-department"
      },
      {
        "department_name": "Environmental Science (Barnard College) ",
        "courses": 0,
        "url": "https://www.columbia.edu/content/environmental-science-barnard-college"
      },
      {
        "department_name": "History Department",
        "courses": 0,
        "url": "https://www.columbia.edu/content/history-department"
      },
      {
        "department_name": "Theatre (School of the Arts)",
        "courses": 0,
        "url": "https://www.columbia.edu/content/theatre-school-arts"
      }
    ]
}

jest.mock('axios', () => {

  return {
    get: jest.fn(() => Promise.resolve(departments)),
  };
});

const axios = require('axios');

let wrapper;
beforeEach(() => {
  wrapper = shallow(<DepartmentsListView />)
})

describe('test DepartmentListView rendering', () => {

  // test('testing the api get method', () => {
  //   axios.get.mockRejectedValueOnce(new Error('error'));
  //   expect(axios.get).rejects.toThrow('error');  // Success!
  // });

  it('componentDidMount with catch', () => {
    axios.get.mockRejectedValueOnce(new Error('error'));
    wrapper
      .instance()
      .componentDidMount()
      .catch(() => expect(axios.get).rejects.toThrow('error'))
  });

  it('basic rendering test', () => {
    wrapper
      .instance()
      .componentDidMount()
      .then(() => {
        expect(axios.get).toHaveBeenCalled();
      })
  });
})

describe('test tab switch rendering', () => {

  it('handleChange', () => {
    wrapper.find('#group').simulate("change", 3)
    expect(wrapper.state('value')).toBe(3)
  });

  it('ALL tab', () => {
    const event = {target: {id: "ALL"}};
    wrapper.find('#ALL').simulate("click", event)
  });

  it('A-C tab', () => {
    const event = {target: {id: "A-C"}};
    wrapper.find('#A-C').simulate("click", event)
    expect(wrapper.state('filtered')).toHaveLength(2)
  });

  it('D-F tab', () => {
    const event = {target: {id: "D-F"}};
    wrapper.find('#D-F').simulate("click", event)
    expect(wrapper.state('filtered')).toHaveLength(1)
  });

  it('G-O tab', () => {
    const event = {target: {id: "G-O"}};
    wrapper.find('#G-O').simulate("click", event)
    expect(wrapper.state('filtered')).toHaveLength(1)
  });

  it('P-Z tab', () => {
    const event = {target: {id: "P-Z"}};
    wrapper.find('#P-Z').simulate("click", event)
    expect(wrapper.state('filtered')).toHaveLength(1)
  });
})