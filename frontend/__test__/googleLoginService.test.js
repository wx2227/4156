import mockAxios from 'axios';
import React from 'react'
import { mount, shallow } from 'enzyme'
import googleLogin from '../src/services/googleLoginService.js'


jest.mock('axios')


describe('routes using memory router', () => {

    mockAxios.post.mockImplementationOnce((url) => {
        if (url === 'http://localhost:8000/rest-auth/google/') {
            return Promise.resolve({ status: 200});
        } else {
            //...
        }
    })

   
  it('post res should be status 200', async() => {
      const res = await googleLogin()
      // console.log(res)
      expect(res.status).toBe(200)
  })


})
