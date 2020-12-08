import React from 'react'
import { mount, shallow } from 'enzyme'
import Vote from '../src/components/Vote.js'
import Cookie from 'js-cookie'
import { Badge } from 'react-bootstrap'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsUp as LikeFilled, faThumbsDown as DislikeFilled } from '@fortawesome/free-solid-svg-icons'
import { faThumbsUp as LikeOutlined, faThumbsDown as DislikeOutlined } from '@fortawesome/free-regular-svg-icons'

window.alert = jest.fn()
jest.mock('axios')
beforeEach(() => {
  jest.clearAllMocks()
})

afterAll(() => {
  jest.clearAllMocks()
})

describe('test default rendered content', () => {
  it('It should contain unfilled star', () => {
    const wrapper = shallow(<Vote />)
    expect(wrapper.contains(<FontAwesomeIcon icon={LikeOutlined} style={{ color: 'grey' }} />)).toBe(true)
    expect(wrapper.contains(<FontAwesomeIcon icon={LikeFilled} style={{ color: 'grey' }} />)).toBe(false)
  })
})

describe('Unit test handleDislike', () => {
  it('handleDislike should decrement dislikes with action `dislikeds', async () => {
    const wrapper = shallow(<Vote />)
    const instance = wrapper.instance()

    instance.setState({ action: 'disliked', dislikes: 100 })

    axios.post.mockImplementationOnce((url) => {
      if (url.startsWith('http://127.0.0.1:8000/api/vote/')) {
        return Promise.resolve({
          data: [{
            id: 4,
            first_name: 'neo',
            last_name: 'matrix',
            is_superuser: false,
            url: 'tmp'
          }]
        })
      } else {
        // ...
      }
    })
    await instance.handleDislike()
    expect(instance.state.dislikes).toBe(99)
  })

  it('handleDislike should not decrement dislikes with action `dislikes` with no response', async () => {
    const wrapper = shallow(<Vote />)
    const instance = wrapper.instance()

    instance.setState({ action: 'disliked', dislikes: 100 })

    axios.post.mockRejectedValueOnce()
    await instance.handleDislike()
    expect(instance.state.dislikes).toBe(100)
  })

  it('handleDislike should decrement likes with action `liked', async () => {
    const wrapper = shallow(<Vote />)
    const instance = wrapper.instance()

    instance.setState({ action: 'liked', likes: 100 })

    axios.post.mockImplementationOnce((url) => {
      if (url.startsWith('http://127.0.0.1:8000/api/vote/')) {
        return Promise.resolve({
          data: [{
            id: 4,
            first_name: 'neo',
            last_name: 'matrix',
            is_superuser: false,
            url: 'tmp'
          }]
        })
      } else {
        // ...
      }
    })
    await instance.handleDislike()
    expect(instance.state.likes).toBe(99)
  })

  it('handleDislike should keep likes but increment dislikes with unknown action', async () => {
    const wrapper = shallow(<Vote />)
    const instance = wrapper.instance()

    instance.setState({ action: '?', likes: 100, dislikes: 100 })

    axios.post.mockImplementationOnce((url) => {
      if (url.startsWith('http://127.0.0.1:8000/api/vote/')) {
        return Promise.resolve({
          data: [{
            id: 4,
            first_name: 'neo',
            last_name: 'matrix',
            is_superuser: false,
            url: 'tmp'
          }]
        })
      } else {
        // ...
      }
    })
    await instance.handleDislike()
    expect(instance.state.likes).toBe(100)
    expect(instance.state.dislikes).toBe(101)
  })

  it('handleDislike should not increment islikes with action `likes` with no response', async () => {
    const wrapper = shallow(<Vote />)
    const instance = wrapper.instance()

    instance.setState({ action: 'liked', dislikes: 100 })

    axios.post.mockRejectedValueOnce()
    await instance.handleDislike()
    expect(instance.state.dislikes).toBe(100)
  })
})

// ------------------------------------------

describe('Unit test handleLike', () => {
  it('handleLike should decrement likes with action `liked', async () => {
    const wrapper = shallow(<Vote />)
    const instance = wrapper.instance()

    instance.setState({ action: 'liked', likes: 100 })

    axios.post.mockImplementationOnce((url) => {
      if (url.startsWith('http://127.0.0.1:8000/api/vote/')) {
        return Promise.resolve({
          data: [{
            id: 4,
            first_name: 'neo',
            last_name: 'matrix',
            is_superuser: false,
            url: 'tmp'
          }]
        })
      } else {
        // ...
      }
    })
    await instance.handleLike()
    expect(instance.state.likes).toBe(99)
  })

  it('handleLike should not decrement likes with action `liked` with no response', async () => {
    const wrapper = shallow(<Vote />)
    const instance = wrapper.instance()

    instance.setState({ action: 'liked', likes: 100 })

    axios.post.mockRejectedValueOnce()
    await instance.handleLike()
    expect(instance.state.likes).toBe(100)
  })

  it('handleLike should decrement disikes with action `disliked', async () => {
    const wrapper = shallow(<Vote />)
    const instance = wrapper.instance()

    instance.setState({ action: 'disliked', dislikes: 100 })

    axios.post.mockImplementationOnce((url) => {
      if (url.startsWith('http://127.0.0.1:8000/api/vote/')) {
        return Promise.resolve({
          data: [{
            id: 4,
            first_name: 'neo',
            last_name: 'matrix',
            is_superuser: false,
            url: 'tmp'
          }]
        })
      } else {
        // ...
      }
    })
    await instance.handleLike()
    expect(instance.state.dislikes).toBe(99)
  })

  it('handleLike should keep dislikes but increment likes with unknown action', async () => {
    const wrapper = shallow(<Vote />)
    const instance = wrapper.instance()

    instance.setState({ action: '?', likes: 100, dislikes: 100 })

    axios.post.mockImplementationOnce((url) => {
      if (url.startsWith('http://127.0.0.1:8000/api/vote/')) {
        return Promise.resolve({
          data: [{
            id: 4,
            first_name: 'neo',
            last_name: 'matrix',
            is_superuser: false,
            url: 'tmp'
          }]
        })
      } else {
        // ...
      }
    })
    await instance.handleLike()
    expect(instance.state.likes).toBe(101)
    expect(instance.state.dislikes).toBe(100)
  })

  it('handleLike should not increment likes with action `likes` with no response', async () => {
    const wrapper = shallow(<Vote />)
    const instance = wrapper.instance()

    instance.setState({ action: '?', likes: 100 })

    axios.post.mockRejectedValueOnce()
    await instance.handleLike()
    expect(instance.state.likes).toBe(100)
  })
})

// ------------------------------------------

describe('Unit test componentDidUpdate', () => {
  it('componentDidUpdate should not set voted to true without valid condition', async () => {
    const fakeNote = {
      id: 2,
      up_vote: 3,
      down_vote: 4
    }

    const tmpProps = { note: fakeNote }

    const wrapper = shallow(<Vote {...tmpProps} />)

    // wrapper.setProps({note: fakeNote})

    const instance = wrapper.instance()

    instance.setState({ voted: false, user_id: 100 })

    instance.componentDidUpdate(tmpProps)

    expect(instance.state.voted).toBe(false)
  })

  it('componentDidUpdate should set voted to true and action to corresponded ones with valid condition', async () => {
    const fakeNote = {
      id: 2,
      up_vote: 3,
      down_vote: 4
    }

    const fakeData1 = [{
      vote: 1
    }]

    const fakeData2 = [{
      vote: -1
    }]

    const fakeData3 = [{
      vote: 9
    }]

    axios.get.mockImplementationOnce((url) => {
      if (url.startsWith('http://127.0.0.1:8000/api/vote/')) {
        return Promise.resolve({ data: fakeData1 })
      }
    }).mockImplementationOnce((url) => {
      if (url.startsWith('http://127.0.0.1:8000/api/vote/')) {
        return Promise.resolve({ data: fakeData2 })
      }
    }).mockImplementationOnce((url) => {
      if (url.startsWith('http://127.0.0.1:8000/api/vote/')) {
        return Promise.resolve({ data: fakeData3 })
      }
    }).mockImplementationOnce((url) => {
      if (url.startsWith('http://127.0.0.1:8000/api/vote/')) {
        return Promise.resolve({ data: [] })
      }
    })

    const tmpProps = { note: fakeNote }

    const wrapper = shallow(<Vote {...tmpProps} />)

    // wrapper.setProps({note: fakeNote})

    const instance = wrapper.instance()

    await instance.setState({ voted: false, user_id: 100 })

    await instance.componentDidUpdate({})
    expect(instance.state.voted).toBe(true)
    expect(instance.state.action).toBe('liked')

    await instance.componentDidUpdate({})
    expect(instance.state.voted).toBe(true)
    expect(instance.state.action).toBe('disliked')

    await instance.componentDidUpdate({})
    expect(instance.state.voted).toBe(true)
    expect(instance.state.action).toBe(null)

    await instance.setState({ voted: false, user_id: 100 })

    await instance.componentDidUpdate({})
    expect(instance.state.voted).toBe(false)
    expect(instance.state.action).toBe(null)
  })
})
