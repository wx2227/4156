import React from "react";
import { mount, shallow } from 'enzyme'
import CommentListView from '../src/components/CommentListView'
import axios from 'axios'

jest.mock('axios')
beforeEach(() => {
  jest.clearAllMocks();
})

afterAll(() => {
  jest.clearAllMocks();
})

jest.mock('react-router-dom', () => ({
  useHistory: () => ({
    push: jest.fn()
  }),
}));

window.alert = jest.fn();

const comments = [
  {
    "id": 9,
    "content": "comment1",
    "time": "2020-12-02T22:31:37Z",
    "user_id": 2,
    "note_id": 5
  },
  {
    "id": 10,
    "content": "comment2",
    "time": "2020-12-02T22:31:39Z",
    "user_id": 2,
    "note_id": 5
  }
]

const note = {
  "id": 5,
  "user_id": 2,
  "course_info": {
    "course_number": "COMS 4156",
    "course_name": "Advanced Software Engineering",
    "term": "2020 Fall",
    "department_name": "Computer Science Department"
  }
}

describe('test comment render', () => {

  beforeAll(() => {
    Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: jest.fn().mockImplementation(query => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(), // Deprecated
        removeListener: jest.fn(), // Deprecated
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      }))
    });
  });

  it ('test comment rendered in CommentListView', () => {

    // const addComment = jest.fn();
    let wrapper = mount(<CommentListView note={note} comments={comments}/>)
    // console.log(wrapper.debug())

    wrapper.find('#editor').props().addComment({
      user_id: 1,
      note_id: 1,
      time: null,
      content: 'comment'
    });

    expect(wrapper.state('comments')).toStrictEqual([{
      user_id: 1,
      note_id: 1,
      time: null,
      content: 'comment',
      user_info: { avatar: undefined }
    }])
  })

  it ('test componentDidUpdate', () => {
    const props = {
      note: {
        comments: {
          content: "comment",
          reverse: () => {return "comment"}
        }
      }
    }

    const prevProps = {
      note: note
    }

    let wrapper = shallow(<CommentListView {...props}/>)

    wrapper.instance().componentDidUpdate(prevProps)

    expect(wrapper.state('comments')).toBe('comment')
  })

  it ('test comment added in CommentEditor can be shown in CommentListView', () => {

    // const addComment = jest.fn();
    let wrapper = mount(<CommentListView note={note} comments={comments}/>)
    // console.log(wrapper.debug())

    wrapper.find('#editor').props().addComment({
      user_id: 1,
      note_id: 1,
      time: null,
      content: 'comment'
    });

    expect(wrapper.state('comments')).toStrictEqual([{
      user_id: 1,
      note_id: 1,
      time: null,
      content: 'comment',
      user_info: { avatar: undefined }
    }])
  })
})