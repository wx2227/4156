import React from 'react'
import { mount, shallow } from 'enzyme'
import PersonalPage from '../src/components/PersonalPage.js'
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

describe('Render content test', () => {

    it('default render content should render profile page', () => {

        let wrapper = shallow(<PersonalPage />)
        let instance = wrapper.instance()
        expect(wrapper.contains(            <ul className='list-group pt-1' style={{ fontSize: '16px', fontWeight: 'bold' }}>
              <li className='list-group-item border-0' style={{ height: '62px' }}>Nickname:</li>
              <li className='list-group-item border-0' style={{ height: '62px' }}>Role:</li>
              <li className='list-group-item border-0' style={{ height: '62px' }}>Credits:</li>
              <li className='list-group-item border-0' style={{ height: '62px' }}>Email:</li>
              <li className='list-group-item border-0' style={{ height: '62px' }}>Favorites:</li>
              <li className='list-group-item border-0' style={{ height: '62px' }}>Notes submitted:</li>
              <li className='list-group-item border-0' style={{ height: '62px' }}>My comments: </li>
            </ul>)).toBe(true)
        expect(instance.state.page).toBe(1)
    })

    it('second page should render favorite page', () => {

        let wrapper = shallow(<PersonalPage />)
        let instance = wrapper.instance()
        instance.setState({page: 2})
        expect(wrapper.contains(            <ul className='list-group pt-1' style={{ fontSize: '16px', fontWeight: 'bold' }}>
              <li className='list-group-item border-0' style={{ height: '62px' }}>Nickname:</li>
              <li className='list-group-item border-0' style={{ height: '62px' }}>Role:</li>
              <li className='list-group-item border-0' style={{ height: '62px' }}>Credits:</li>
              <li className='list-group-item border-0' style={{ height: '62px' }}>Email:</li>
              <li className='list-group-item border-0' style={{ height: '62px' }}>Favorites:</li>
              <li className='list-group-item border-0' style={{ height: '62px' }}>Notes submitted:</li>
              <li className='list-group-item border-0' style={{ height: '62px' }}>My comments: </li>
            </ul>)).toBe(false)
        expect(instance.state.page).toBe(2)
    })

        it('third page should render user note page', () => {

        let wrapper = shallow(<PersonalPage />)
        let instance = wrapper.instance()
               instance.setState({page: 3})
        expect(wrapper.contains(            <ul className='list-group pt-1' style={{ fontSize: '16px', fontWeight: 'bold' }}>
              <li className='list-group-item border-0' style={{ height: '62px' }}>Nickname:</li>
              <li className='list-group-item border-0' style={{ height: '62px' }}>Role:</li>
              <li className='list-group-item border-0' style={{ height: '62px' }}>Credits:</li>
              <li className='list-group-item border-0' style={{ height: '62px' }}>Email:</li>
              <li className='list-group-item border-0' style={{ height: '62px' }}>Favorites:</li>
              <li className='list-group-item border-0' style={{ height: '62px' }}>Notes submitted:</li>
              <li className='list-group-item border-0' style={{ height: '62px' }}>My comments: </li>
            </ul>)).toBe(false)
        expect(instance.state.page).toBe(3)
    })

        it('third page should render user comments page', () => {

        let wrapper = shallow(<PersonalPage />)
        let instance = wrapper.instance()
               instance.setState({page: 4})
        expect(wrapper.contains(            <ul className='list-group pt-1' style={{ fontSize: '16px', fontWeight: 'bold' }}>
              <li className='list-group-item border-0' style={{ height: '62px' }}>Nickname:</li>
              <li className='list-group-item border-0' style={{ height: '62px' }}>Role:</li>
              <li className='list-group-item border-0' style={{ height: '62px' }}>Credits:</li>
              <li className='list-group-item border-0' style={{ height: '62px' }}>Email:</li>
              <li className='list-group-item border-0' style={{ height: '62px' }}>Favorites:</li>
              <li className='list-group-item border-0' style={{ height: '62px' }}>Notes submitted:</li>
              <li className='list-group-item border-0' style={{ height: '62px' }}>My comments: </li>
            </ul>)).toBe(false)
        expect(instance.state.page).toBe(4)
    })

})


describe('unit tests', () => {
    
    it('updateUserinfo should setState after receiveing response', async () => {
        
        axios.get.mockImplementation((url) => {
            return Promise.resolve({data: {
                credits: 1,
                email: "gmail",
                id: 4,
                notes: [],
                favorites: [],
                avatar: "url",
                nickname: "niki",
                comments: [],
                is_superuser: true

            }})
        })

        Cookie.get = jest.fn().mockImplementationOnce(() => 2)

        let wrapper = shallow(<PersonalPage />)
        let instance = wrapper.instance()
        await instance.updateUserInfo() 
        expect(instance.state.user_id).toBe(4)

    })


        
    it('updateUserinfo should not setState after receiveing reject response', async () => {
        
        axios.get.mockImplementation((url) => {
            return Promise.reject({data: {
                credits: 1,
                email: "gmail",
                id: 4,
                notes: [],
                favorites: [],
                avatar: "url",
                nickname: "niki",
                comments: [],
                is_superuser: true

            }})
        })

        Cookie.get = jest.fn().mockImplementationOnce(() => 2)

        let wrapper = shallow(<PersonalPage />)
        let instance = wrapper.instance()
        await instance.updateUserInfo() 
        expect(instance.state.user_id).toBe(-1)

    })


    it('disable forms should disable all 7 forms', async () => {
        
        axios.get.mockImplementation((url) => {
            return Promise.resolve({data: {
                credits: 1,
                email: "gmail",
                id: 4,
                notes: [],
                favorites: [],
                avatar: "url",
                nickname: "niki",
                comments: [],
                is_superuser: true

            }})
        })

        Cookie.get = jest.fn().mockImplementationOnce(() => 2)

        let wrapper = shallow(<PersonalPage />)
        let instance = wrapper.instance()
        await instance.updateUserInfo() 
        instance.disableForms()
        const forms = wrapper.find(".userInfo")
        expect(forms.length).toBe(7)
        expect(instance.state.edit).toBe(false)

    })

    it('handleClickEdit should set edit to be true', async () => {
        
        axios.get.mockImplementation((url) => {
            return Promise.resolve({data: {
                credits: 1,
                email: "gmail",
                id: 4,
                notes: [],
                favorites: [],
                avatar: "url",
                nickname: "niki",
                comments: [],
                is_superuser: true

            }})
        })

        Cookie.get = jest.fn().mockImplementationOnce(() => 2)

        let wrapper = shallow(<PersonalPage />)
        let instance = wrapper.instance()
        await instance.updateUserInfo() 
        instance.handleClickEdit()
        expect(instance.state.edit).toBe(true)

    })


    it('handleClickCancel should set edit to be false', async () => {
        
        axios.get.mockImplementation((url) => {
            return Promise.resolve({data: {
                credits: 1,
                email: "gmail",
                id: 4,
                notes: [],
                favorites: [],
                avatar: "url",
                nickname: "niki",
                comments: [],
                is_superuser: true

            }})
        })

        Cookie.get = jest.fn().mockImplementationOnce(() => 2)

        let wrapper =await mount(<PersonalPage />, { attachTo: document.body })
        let instance = wrapper.instance()
        await instance.updateUserInfo() 
        instance.handleClickEdit()
        expect(instance.state.edit).toBe(true)
        instance.handleClickCancel()
        expect(instance.state.edit).toBe(false)

    })

    it('handleNickNameInput should set nicknameInput', async () => {
        
        axios.get.mockImplementation((url) => {
            return Promise.resolve({data: {
                credits: 1,
                email: "gmail",
                id: 4,
                notes: [],
                favorites: [],
                avatar: "url",
                nickname: "niki",
                comments: [],
                is_superuser: true

            }})
        })

        Cookie.get = jest.fn().mockImplementationOnce(() => 2)

        let wrapper =await shallow(<PersonalPage />)
        let instance = wrapper.instance()
        await instance.handleNickNameInput({target: {
            value: 'Zephy'
        }})
        expect(instance.state.nickNameInput).toBe('Zephy')

    })


    it('getButton class return values on input', async () => {
        
        axios.get.mockImplementation((url) => {
            return Promise.resolve({data: {
                credits: 1,
                email: "gmail",
                id: 4,
                notes: [],
                favorites: [],
                avatar: "url",
                nickname: "niki",
                comments: [],
                is_superuser: true

            }})
        })

        Cookie.get = jest.fn().mockImplementationOnce(() => 2)

        let wrapper =await shallow(<PersonalPage />)
        let instance = wrapper.instance()
        await instance.setState({page: 1})
        expect(instance.getButtonClass(2)).toBe('btn btn-light rounded-0 ')
        expect(instance.getButtonClass(1)).toBe('btn btn-primary rounded-0')

    })

    it('Set Page should set page', async () => {
        
        axios.get.mockImplementation((url) => {
            return Promise.resolve({data: {
                credits: 1,
                email: "gmail",
                id: 4,
                notes: [],
                favorites: [],
                avatar: "url",
                nickname: "niki",
                comments: [],
                is_superuser: true

            }})
        })

        Cookie.get = jest.fn().mockImplementationOnce(() => 2)

        let wrapper =await shallow(<PersonalPage />)
        let instance = wrapper.instance()
        await instance.setPage(100)
        expect(instance.state.page).toBe(100)

    })


    it('delete comment should receive response and update user info', async () => {
        
        axios.get.mockImplementation((url) => {
            return Promise.resolve({data: {
                credits: 1,
                email: "gmail",
                id: 4,
                notes: [],
                favorites: [],
                avatar: "url",
                nickname: "niki",
                comments: [],
                is_superuser: true

            }})
        })

        axios.delete.mockImplementationOnce((url) => {
            return Promise.resolve({
                status:200
            })
        }).mockImplementationOnce((url) => {
            return Promise.reject({
                status:404
            })
        })

        Cookie.get = jest.fn().mockImplementationOnce(() => 2)

        let wrapper =await shallow(<PersonalPage />)
        let instance = wrapper.instance()
        let res =  await instance.deleteComment(2)
        res =  await instance.deleteComment(2)
        expect(instance.state.user_id).toBe(4)
    })

        it('delete Note should receive response and update user info', async () => {
        
        axios.get.mockImplementation((url) => {
            return Promise.resolve({data: {
                credits: 1,
                email: "gmail",
                id: 4,
                notes: [],
                favorites: [],
                avatar: "url",
                nickname: "niki",
                comments: [],
                is_superuser: true

            }})
        })

        axios.delete.mockImplementationOnce((url) => {
            return Promise.resolve({
                status:200
            })
        }).mockImplementationOnce((url) => {
            return Promise.reject({
                status:404
            })
        })

        Cookie.get = jest.fn().mockImplementationOnce(() => 2)

        let wrapper =await shallow(<PersonalPage />)
        let instance = wrapper.instance()
        let res =  await instance.deleteNote(2)
        res =  await instance.deleteNote(2)
        expect(instance.state.user_id).toBe(4)
    })

        it('delete favorite should receive response and update user info', async () => {
        
        axios.get.mockImplementation((url) => {
            return Promise.resolve({data: {
                credits: 1,
                email: "gmail",
                id: 4,
                notes: [],
                favorites: [],
                avatar: "url",
                nickname: "niki",
                comments: [],
                is_superuser: true

            }})
        })

        axios.delete.mockImplementationOnce((url) => {
            return Promise.resolve({
                status:200
            })
        }).mockImplementationOnce((url) => {
            return Promise.reject({
                status:404
            })
        })

        Cookie.get = jest.fn().mockImplementationOnce(() => 2)

        let wrapper =await shallow(<PersonalPage />)
        let instance = wrapper.instance()
        let res =  await instance.deleteFavorite(2)
        res =  await instance.deleteFavorite(2)
        expect(instance.state.user_id).toBe(4)
    })
})