import { mount, shallow } from 'enzyme'
import CommentEditor from '../src/components/CommentEditor'
import axios from 'axios'
import React from 'react'

jest.mock('axios')
beforeEach(() => {
  jest.clearAllMocks()
})

afterAll(() => {
  jest.clearAllMocks()
})

window.alert = jest.fn()

const comment = {
  user_id: 1,
  note_id: 1,
  time: null,
  content: ''
}

const note = {
  id: 5,
  user_id: 2
}

describe('test comment editor', () => {
  beforeAll(() => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation(query => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(), // Deprecated
        removeListener: jest.fn(), // Deprecated
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn()
      }))
    })
  })

  it('test componentDidUpdate', () => {
    const props = {
      note: {
        id: 4,
        user_id: 2
      }
    }

    const prevProps = {
      note: note
    }

    const wrapper = shallow(<CommentEditor {...props} />)

    wrapper.instance().componentDidUpdate(prevProps)

    expect(wrapper.state('comment').note_id).toBe(4)
  })

  it('test enter comment in CommentEditor', () => {
    const handleChange = jest.fn()

    const editor = mount(<CommentEditor note={note} handleChange={handleChange} />)

    editor.find('TextArea').simulate('change', {
      target: {
        value: 'comment'
      }
    })
    expect(editor.state('value')).toBe('comment')
  })

  it('test cannot submit blank comment', async () => {
    const wrapper = shallow(<CommentEditor note={note} />)
    const instance = wrapper.instance()

    instance.setState({ comment: comment })

    await instance.handleSubmit()
    expect(instance.state.comment).toStrictEqual({
      user_id: 1,
      note_id: 1,
      time: null,
      content: ''
    })
  })

  it('test submit valid comment', async () => {
    const addComment = jest.fn()
    const wrapper = shallow(<CommentEditor note={note} addComment={addComment} />)
    const instance = wrapper.instance()

    instance.setState({ comment: comment, value: 'comment' })

    axios.post.mockImplementationOnce((url) => {
      if (url.startsWith('http://127.0.0.1:8000/api/comment/')) {
        return Promise.resolve({
          data: [{
            id: 4,
            user_id: 1,
            note_id: 1,
            time: null,
            content: 'comment'
          }]
        })
      }
    })
    await instance.handleSubmit()
    expect(instance.state.comment).toStrictEqual({
      user_id: 1,
      note_id: 1,
      time: null,
      content: ''
    })
  })

  it('test axios return error', async () => {
    const addComment = jest.fn()
    const wrapper = shallow(<CommentEditor note={note} addComment={addComment} />)
    const instance = wrapper.instance()

    instance.setState({ comment: comment, value: 'comment', loading: true })

    axios.post.mockImplementationOnce((url) => {
      if (url.startsWith('http://127.0.0.1:8000/api/comment/')) {
        return Promise.resolve({ error: 4 })
      }
    })
    await instance.handleSubmit()
    expect(instance.state.loading).toBe(false)
  })
})
