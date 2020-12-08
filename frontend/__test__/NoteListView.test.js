import React from 'react'
import { mount, shallow } from 'enzyme'
import NotesListView from '../src/components/NotesListView.js'
import Cookie from 'js-cookie'
import axios from 'axios'

window.alert = jest.fn()
jest.mock('axios')
beforeEach(() => {
  jest.clearAllMocks()
})

afterAll(() => {
  jest.clearAllMocks()
})

const noteSample = [
  {
    id: 5,
    user_id: 2,
    file_name: 'name',
    file_url: 'https://coms4156.s3-us-west-1.amazonaws.com/f030c473-61a1-4f3b-9193-08d45cf3b0c0.pdf',
    description: 'des',
    time: '2020-12-02T18:46:30.176473Z',
    up_votes: 1,
    down_votes: 0,
    comments: [
      {
        id: 9,
        user_info: {
          id: 2,
          first_name: 'Wan',
          last_name: 'XU',
          email: 'wx2227@columbia.edu',
          avatar: 'https://lh6.googleusercontent.com/-mOFZSfmWuG8/AAAAAAAAAAI/AAAAAAAAAAA/AMZuucl2Arj7Gqi7LTYuAieuGoIosc_2lQ/s96-c/photo.jpg',
          credits: 0,
          is_superuser: true,
          nick_name: 'Zafigevuk',
          notes: [
            {
              id: 5,
              user_id: 2,
              course_number: 'COMS 4156',
              file_name: 'name',
              file_url: 'https://coms4156.s3-us-west-1.amazonaws.com/f030c473-61a1-4f3b-9193-08d45cf3b0c0.pdf',
              description: 'des',
              time: '2020-12-02T18:46:30.176473Z'
            },
            {
              id: 6,
              user_id: 2,
              course_number: 'COMS 4118',
              file_name: 'name',
              file_url: 'https://coms4156.s3-us-west-1.amazonaws.com/a27726ab-5820-439e-a1aa-ed82902873b4.pdf',
              description: 'des',
              time: '2020-12-02T22:48:32.949327Z'
            },
            {
              id: 7,
              user_id: 2,
              course_number: 'COMS 4156',
              file_name: 'name',
              file_url: 'https://coms4156.s3-us-west-1.amazonaws.com/4121a382-614b-4192-81db-5710744aac0f.pdf',
              description: 'des',
              time: '2020-12-05T01:36:09.520937Z'
            }
          ],
          favorites: [
            {
              id: 4,
              note_info: {
                id: 6,
                user_id: 2,
                course_number: 'COMS 4118',
                file_name: 'name',
                file_url: 'https://coms4156.s3-us-west-1.amazonaws.com/a27726ab-5820-439e-a1aa-ed82902873b4.pdf',
                description: 'des',
                time: '2020-12-02T22:48:32.949327Z'
              },
              favorite: 1,
              user_id: 2,
              note_id: 6
            },
            {
              id: 5,
              note_info: {
                id: 5,
                user_id: 2,
                course_number: 'COMS 4156',
                file_name: 'name',
                file_url: 'https://coms4156.s3-us-west-1.amazonaws.com/f030c473-61a1-4f3b-9193-08d45cf3b0c0.pdf',
                description: 'des',
                time: '2020-12-02T18:46:30.176473Z'
              },
              favorite: 1,
              user_id: 2,
              note_id: 5
            },
            {
              id: 6,
              note_info: {
                id: 7,
                user_id: 2,
                course_number: 'COMS 4156',
                file_name: 'name',
                file_url: 'https://coms4156.s3-us-west-1.amazonaws.com/4121a382-614b-4192-81db-5710744aac0f.pdf',
                description: 'des',
                time: '2020-12-05T01:36:09.520937Z'
              },
              favorite: 1,
              user_id: 2,
              note_id: 7
            }
          ],
          comments: [
            {
              id: 9,
              content: 'comment1',
              time: '2020-12-02T22:31:37Z',
              user_id: 2,
              note_id: 5
            },
            {
              id: 10,
              content: 'comment2',
              time: '2020-12-02T22:31:39Z',
              user_id: 2,
              note_id: 5
            },
            {
              id: 11,
              content: 'comment1',
              time: '2020-12-02T22:48:45Z',
              user_id: 2,
              note_id: 6
            }
          ]
        },
        content: 'comment1',
        time: '2020-12-02T22:31:37Z',
        user_id: 2,
        note_id: 5
      },
      {
        id: 10,
        user_info: {
          id: 2,
          first_name: 'Wan',
          last_name: 'XU',
          email: 'wx2227@columbia.edu',
          avatar: 'https://lh6.googleusercontent.com/-mOFZSfmWuG8/AAAAAAAAAAI/AAAAAAAAAAA/AMZuucl2Arj7Gqi7LTYuAieuGoIosc_2lQ/s96-c/photo.jpg',
          credits: 0,
          is_superuser: true,
          nick_name: 'Zafigevuk',
          notes: [
            {
              id: 5,
              user_id: 2,
              course_number: 'COMS 4156',
              file_name: 'name',
              file_url: 'https://coms4156.s3-us-west-1.amazonaws.com/f030c473-61a1-4f3b-9193-08d45cf3b0c0.pdf',
              description: 'des',
              time: '2020-12-02T18:46:30.176473Z'
            },
            {
              id: 6,
              user_id: 2,
              course_number: 'COMS 4118',
              file_name: 'name',
              file_url: 'https://coms4156.s3-us-west-1.amazonaws.com/a27726ab-5820-439e-a1aa-ed82902873b4.pdf',
              description: 'des',
              time: '2020-12-02T22:48:32.949327Z'
            },
            {
              id: 7,
              user_id: 2,
              course_number: 'COMS 4156',
              file_name: 'name',
              file_url: 'https://coms4156.s3-us-west-1.amazonaws.com/4121a382-614b-4192-81db-5710744aac0f.pdf',
              description: 'des',
              time: '2020-12-05T01:36:09.520937Z'
            }
          ],
          favorites: [
            {
              id: 4,
              note_info: {
                id: 6,
                user_id: 2,
                course_number: 'COMS 4118',
                file_name: 'name',
                file_url: 'https://coms4156.s3-us-west-1.amazonaws.com/a27726ab-5820-439e-a1aa-ed82902873b4.pdf',
                description: 'des',
                time: '2020-12-02T22:48:32.949327Z'
              },
              favorite: 1,
              user_id: 2,
              note_id: 6
            },
            {
              id: 5,
              note_info: {
                id: 5,
                user_id: 2,
                course_number: 'COMS 4156',
                file_name: 'name',
                file_url: 'https://coms4156.s3-us-west-1.amazonaws.com/f030c473-61a1-4f3b-9193-08d45cf3b0c0.pdf',
                description: 'des',
                time: '2020-12-02T18:46:30.176473Z'
              },
              favorite: 1,
              user_id: 2,
              note_id: 5
            },
            {
              id: 6,
              note_info: {
                id: 7,
                user_id: 2,
                course_number: 'COMS 4156',
                file_name: 'name',
                file_url: 'https://coms4156.s3-us-west-1.amazonaws.com/4121a382-614b-4192-81db-5710744aac0f.pdf',
                description: 'des',
                time: '2020-12-05T01:36:09.520937Z'
              },
              favorite: 1,
              user_id: 2,
              note_id: 7
            }
          ],
          comments: [
            {
              id: 9,
              content: 'comment1',
              time: '2020-12-02T22:31:37Z',
              user_id: 2,
              note_id: 5
            },
            {
              id: 10,
              content: 'comment2',
              time: '2020-12-02T22:31:39Z',
              user_id: 2,
              note_id: 5
            },
            {
              id: 11,
              content: 'comment1',
              time: '2020-12-02T22:48:45Z',
              user_id: 2,
              note_id: 6
            }
          ]
        },
        content: 'comment2',
        time: '2020-12-02T22:31:39Z',
        user_id: 2,
        note_id: 5
      }
    ],
    favorites: [
      {
        id: 5,
        favorite: 1,
        user_id: 2,
        note_id: 5
      }
    ],
    course_info: {
      course_number: 'COMS 4156',
      course_name: 'Advanced Software Engineering',
      term: '2020 Fall',
      department_name: 'Computer Science Department'
    }
  },
  {
    id: 6,
    user_id: 2,
    file_name: 'name',
    file_url: 'https://coms4156.s3-us-west-1.amazonaws.com/a27726ab-5820-439e-a1aa-ed82902873b4.pdf',
    description: 'des',
    time: '2020-12-02T22:48:32.949327Z',
    up_votes: 1,
    down_votes: 0,
    comments: [
      {
        id: 11,
        user_info: {
          id: 2,
          first_name: 'Wan',
          last_name: 'XU',
          email: 'wx2227@columbia.edu',
          avatar: 'https://lh6.googleusercontent.com/-mOFZSfmWuG8/AAAAAAAAAAI/AAAAAAAAAAA/AMZuucl2Arj7Gqi7LTYuAieuGoIosc_2lQ/s96-c/photo.jpg',
          credits: 0,
          is_superuser: true,
          nick_name: 'Zafigevuk',
          notes: [
            {
              id: 5,
              user_id: 2,
              course_number: 'COMS 4156',
              file_name: 'name',
              file_url: 'https://coms4156.s3-us-west-1.amazonaws.com/f030c473-61a1-4f3b-9193-08d45cf3b0c0.pdf',
              description: 'des',
              time: '2020-12-02T18:46:30.176473Z'
            },
            {
              id: 6,
              user_id: 2,
              course_number: 'COMS 4118',
              file_name: 'name',
              file_url: 'https://coms4156.s3-us-west-1.amazonaws.com/a27726ab-5820-439e-a1aa-ed82902873b4.pdf',
              description: 'des',
              time: '2020-12-02T22:48:32.949327Z'
            },
            {
              id: 7,
              user_id: 2,
              course_number: 'COMS 4156',
              file_name: 'name',
              file_url: 'https://coms4156.s3-us-west-1.amazonaws.com/4121a382-614b-4192-81db-5710744aac0f.pdf',
              description: 'des',
              time: '2020-12-05T01:36:09.520937Z'
            }
          ],
          favorites: [
            {
              id: 4,
              note_info: {
                id: 6,
                user_id: 2,
                course_number: 'COMS 4118',
                file_name: 'name',
                file_url: 'https://coms4156.s3-us-west-1.amazonaws.com/a27726ab-5820-439e-a1aa-ed82902873b4.pdf',
                description: 'des',
                time: '2020-12-02T22:48:32.949327Z'
              },
              favorite: 1,
              user_id: 2,
              note_id: 6
            },
            {
              id: 5,
              note_info: {
                id: 5,
                user_id: 2,
                course_number: 'COMS 4156',
                file_name: 'name',
                file_url: 'https://coms4156.s3-us-west-1.amazonaws.com/f030c473-61a1-4f3b-9193-08d45cf3b0c0.pdf',
                description: 'des',
                time: '2020-12-02T18:46:30.176473Z'
              },
              favorite: 1,
              user_id: 2,
              note_id: 5
            },
            {
              id: 6,
              note_info: {
                id: 7,
                user_id: 2,
                course_number: 'COMS 4156',
                file_name: 'name',
                file_url: 'https://coms4156.s3-us-west-1.amazonaws.com/4121a382-614b-4192-81db-5710744aac0f.pdf',
                description: 'des',
                time: '2020-12-05T01:36:09.520937Z'
              },
              favorite: 1,
              user_id: 2,
              note_id: 7
            }
          ],
          comments: [
            {
              id: 9,
              content: 'comment1',
              time: '2020-12-02T22:31:37Z',
              user_id: 2,
              note_id: 5
            },
            {
              id: 10,
              content: 'comment2',
              time: '2020-12-02T22:31:39Z',
              user_id: 2,
              note_id: 5
            },
            {
              id: 11,
              content: 'comment1',
              time: '2020-12-02T22:48:45Z',
              user_id: 2,
              note_id: 6
            }
          ]
        },
        content: 'comment1',
        time: '2020-12-02T22:48:45Z',
        user_id: 2,
        note_id: 6
      }
    ],
    favorites: [
      {
        id: 4,
        favorite: 1,
        user_id: 2,
        note_id: 6
      }
    ],
    course_info: {
      course_number: 'COMS 4118',
      course_name: 'Operating System',
      term: '2020 Fall',
      department_name: 'Computer Science Department'
    }
  },
  {
    id: 7,
    user_id: 2,
    file_name: 'name',
    file_url: 'https://coms4156.s3-us-west-1.amazonaws.com/4121a382-614b-4192-81db-5710744aac0f.pdf',
    description: 'des',
    time: '2020-12-05T01:36:09.520937Z',
    up_votes: 1,
    down_votes: 0,
    comments: [],
    favorites: [
      {
        id: 6,
        favorite: 1,
        user_id: 2,
        note_id: 7
      }
    ],
    course_info: {
      course_number: 'COMS 4156',
      course_name: 'Advanced Software Engineering',
      term: '2020 Fall',
      department_name: 'Computer Science Department'
    }
  }
]

describe('default content checked', () => {
  it('with no course set, default should be airNote words', () => {
    const wrapper = shallow(<NotesListView />)
    const instance = wrapper.instance()
    expect(wrapper.contains(<h1 className='text-white'>Air Notes</h1>)).toBe(true)
  })

  it('with  course set, default should not be airNote words', () => {
    const match = { params: { course_number: 'COMS 4156' } }
    const wrapper = shallow(<NotesListView match={match} />)
    const instance = wrapper.instance()
    instance.setState({ course: { course_name: 'test', course_number: 'COMS 4156' } })
    expect(wrapper.contains(<h1 className='text-white'>Air Notes</h1>)).toBe(false)
  })
})

describe('unit test', () => {
  it('component didmout and set notes with axios valid', async () => {
    axios.get.mockImplementation(() => { return Promise.resolve({ data: noteSample }) })

    const match = { params: { course_number: 'COMS 4156' } }
    const wrapper = await shallow(<NotesListView match={match} />)
    const instance = wrapper.instance()
    await instance.setState({ notes: null })
    await instance.setState({ course: { course_name: 'test', course_number: 'COMS 4156' } })
    await instance.componentDidMount()
    expect(instance.state.notes).not.toBe(null)
  })

  it('component wont set notes with axios invalid', async () => {
    axios.get.mockImplementation(() => { return Promise.reject({ data: noteSample }) })

    const match = { params: {} }
    const wrapper = await shallow(<NotesListView match={match} />)
    const instance = wrapper.instance()
    await instance.setState({ notes: null })
    await instance.componentDidMount()
    expect(instance.state.notes).toBe(null)
  })

  it('component didmout and set notes with axios valid', async () => {
    axios.get.mockImplementation(() => { return Promise.resolve({ data: noteSample }) })

    const match = { params: { course_number: 'COMS 9999' } }
    const wrapper = await shallow(<NotesListView match={match} />)
    const instance = wrapper.instance()
    await instance.setState({ notes: null })
    await instance.setState({ course: { course_name: 'test', course_number: 'COMS 9999' } })
    await instance.componentDidMount()
    expect(instance.state.filtered.length).toBe(0)
  })

  it('component didUpdate else condition', async () => {
    axios.get.mockImplementation(() => { return Promise.resolve({ data: noteSample }) })

    const match = { params: { course_number: 'COMS 4156' } }
    const wrapper = await shallow(<NotesListView match={match} />)
    const instance = wrapper.instance()
    await instance.setState({ notes: null })
    await instance.setState({ course: { course_name: 'test', course_number: 'COMS 4156' } })
    await instance.componentDidUpdate({ match: match })
    expect(instance.state.course).not.toBe(undefined)
  })

  it('component didUpdate if condition', async () => {
    axios.get.mockImplementation(() => { return Promise.resolve({ data: noteSample }) })

    const match = { params: { course_number: 'COMS 4156' } }
    const match1 = { params: { course_number: 'COMS 4118' } }
    const wrapper = await shallow(<NotesListView match={match} />)
    const instance = wrapper.instance()
    await instance.componentDidUpdate({ match: match1 })
    expect(instance.state.filtered.length).not.toBe(0)
  })

  it('component didUpdate if condition with invalid course number', async () => {
    axios.get.mockImplementation(() => { return Promise.resolve({ data: noteSample }) })

    const match = { params: { course_number: 'COMS 9999' } }
    const match1 = { params: { course_number: 'COMS 4118' } }
    const wrapper = await shallow(<NotesListView match={match} />)
    const instance = wrapper.instance()
    await instance.componentDidUpdate({ match: match1 })
    expect(instance.state.filtered.length).toBe(0)
  })

  it('component didUpdate if condition with undefined course number', async () => {
    axios.get.mockImplementation(() => { return Promise.resolve({ data: noteSample }) })

    const match = { params: {} }
    const match1 = { params: { course_number: 'COMS 4118' } }
    const wrapper = await shallow(<NotesListView match={match} />)
    const instance = wrapper.instance()
    await instance.componentDidUpdate({ match: match1 })
    expect(instance.state.filtered.length).toBe(instance.state.notes.length)
  })

  it('component didUpdate if condition with undefined course number', async () => {
    axios.get.mockImplementation(() => { return Promise.resolve({ data: noteSample }) })

    const match = { params: { course_number: '' } }
    const match1 = { params: { course_number: 'COMS 4118' } }
    const wrapper = await shallow(<NotesListView match={match} />)
    const instance = wrapper.instance()
    await instance.componentDidUpdate({ match: match1 })
    expect(instance.state.filtered.length).toBe(instance.state.notes.length)
  })
})
