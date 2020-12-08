import React from 'react'
import { shallow } from 'enzyme'
import Favorite from '../src/components/Favorite'
import axios from 'axios'

window.alert = jest.fn()
jest.mock('axios')

beforeEach(() => {
  jest.clearAllMocks()
})

afterAll(() => {
  jest.clearAllMocks()
})

let wrapper
beforeAll(() => {
  wrapper = shallow(<Favorite />)
})

describe('test favorite component', () => {
  it('test componentDidUpdate favorite==1', async () => {
    const prevProps = {
      note_id: 2
    }
    const props = {
      note_id: 1
    }

    axios.get.mockImplementationOnce(() => Promise.resolve({ data: [{ favorite: 1 }] }))
    const wrapper = shallow(<Favorite {...props} />)
    await wrapper.instance().componentDidUpdate(prevProps)
    expect(wrapper.state('action')).toBe('favorite')
  })

  it('test componentDidUpdate favorite!=1', async () => {
    const prevProps = {
      note_id: 2
    }
    const props = {
      note_id: 1
    }

    axios.get.mockImplementationOnce(() => Promise.resolve({ data: [{ favorite: 0 }] }))
    const wrapper = shallow(<Favorite {...props} />)
    await wrapper.instance().componentDidUpdate(prevProps)
    expect(wrapper.state('action')).toBe(null)
  })

  it('test componentDidUpdate else branch', async () => {
    const prevProps = {
      note_id: 2
    }
    const props = {
      note_id: 1
    }

    axios.get.mockImplementationOnce(() => Promise.resolve({ data: [] }))
    const wrapper = shallow(<Favorite {...props} />)
    await wrapper.instance().componentDidUpdate(prevProps)
  })

  it('undo favorite', async () => {
    wrapper.setState({ action: 'favorite' })

    axios.post.mockImplementationOnce(() => Promise.resolve({}))
    await wrapper.instance().handleFavorite()
    expect(wrapper.state('action')).toBe(null)
  })

  it('add favorite', async () => {
    axios.post.mockImplementationOnce(() => Promise.resolve({}))
    await wrapper.instance().handleFavorite()
    expect(wrapper.state('action')).toBe('favorite')
  })

  it('undo favorite with catch', async () => {
    wrapper.setState({ action: 'favorite' })

    axios.post.mockImplementationOnce(() => Promise.reject(() => { new Error('error') }))
    await wrapper.instance().handleFavorite()
  })

  it('add favorite with catch', async () => {
    wrapper.setState({ action: null })
    axios.post.mockImplementationOnce(() => Promise.reject(() => { new Error('error') }))
    await wrapper.instance().handleFavorite()
  })
})
