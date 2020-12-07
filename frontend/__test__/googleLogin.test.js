import GoogleButton, { responseGoogle, handleLoginFailure } from "../src/containers/googleLogin"
import mockAxios from 'axios';
import React from 'react'
import { mount, shallow } from 'enzyme'
import LoginPage from '../src/containers/googleLogin'
import Cookies from 'js-cookie'
import { GoogleLogin } from 'react-google-login'
 


jest.mock('axios')
window.alert = jest.fn(); 

delete window.location;
 window.location = { assign: jest.fn() };
const resWithGmail = {
    getBasicProfile: () => {
        return {
            getEmail() {
                return "user1@gmail.com"
            },
            getImageUrl() {
                "fake_urrl.com"
            }
        }
    }
}

const resWithLionMail = {
    getBasicProfile: () => {
        return {
            getEmail() {
                return "user1@columbia.edu"
            },
            getImageUrl() {
                "fake_urrl.com"
            }
        }
    }
}

const resWithLionMail2 = {
    getBasicProfile: () => {
        return {
            getEmail() {
                return "user2@columbia.edu"
            },
            getImageUrl() {
                "fake_urrl.com"
            }
        }
    }
}

mockAxios.post.mockImplementation((url) => {
    if (url === 'http://localhost:8000/rest-auth/google/') {
        return Promise.resolve({ data: {key: 200}});
    } else {
        //...
    }
})

const removeCookeis = () => {
      Cookies.remove('user_id')
      Cookies.remove('firstname')
      Cookies.remove('lastname')
      Cookies.remove('url')
      Cookies.remove('admin')
}


describe('Output content check', () => {

  it('Default, googleLogin should exists', () => {
 
    const wrapper = shallow(<GoogleButton />)
    // console.log(wrapper.debug());
    expect(wrapper.contains(<div><b id='title'>AirNote</b></div>)).toEqual(true)
  })

})



describe('methods unit tests', () => {
    
    it("user should be rejected with email other than lion mail", async () => {
        removeCookeis()
        await responseGoogle(resWithGmail)
        expect(Cookies.get('token')).toEqual(undefined)
    })

    it("user should be accepted with Lionmail but no user info set without response from server ", async () => {
        removeCookeis()
        await responseGoogle(resWithLionMail2)
        expect(Cookies.get('token')).toEqual("200")
        expect(Cookies.get('firstname')).toEqual(undefined)
    })

    mockAxios.get.mockImplementation((url) => {
        if (url.startsWith("http://localhost:8000/api/user/?email=user1@columbia.edu")) {
            return Promise.resolve({ data: [{
                id: 4,
                first_name: "neo",
                last_name: "matrix",
                is_superuser: false,
                url: "tmp"
            }]})
        } else {
            //...
        }
    })

    it("user should be accepted with Lionmail", async () => {
        removeCookeis()
        await responseGoogle(resWithLionMail)
        expect(Cookies.get('token')).toEqual("200")
        expect(Cookies.get('firstname')).toEqual("neo")
    })



    window.alert.mockClear();
    it("handleLogin failure test", async () => {
        handleLoginFailure()
         expect(window.alert).toBeCalledWith('Failed to log out')
    })

})
removeCookeis()
 window.alert.mockClear();
