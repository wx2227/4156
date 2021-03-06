import React from 'react'
import Cookies from 'js-cookie'
import moment from 'moment'
import { Form } from 'react-bootstrap'
import axios from 'axios'
import CourseAutoComplete from './CourseAutoComplete'

class UploadForm extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      courses: [],
      selectedCourse: ''
    }
  }

  componentDidMount (): void {
    axios.get('http://127.0.0.1:8000/api/course').then(res => {
      this.setState({
        courses: res.data
      })
    })
  }

  onHandleSelectCourse = (e) => {
    console.log(e)
    if (e.length >= 1) {
      this.setState({
        ...this.state,
        selectedCourse: e[0]
      })
    }
  }

  /* istanbul ignore next */
  toBase64 : String = file => new Promise((resolve, reject) => {
    const reader = new FileReader()
    /* istanbul ignore next */
    reader.readAsDataURL(file)
    /* istanbul ignore next */
    reader.onload = () => resolve(reader.result)
    /* istanbul ignore next */
    reader.onerror = error => reject(error)
  });

  async isCourseNumberValid (courseNumber) : boolean {
    return await axios.get('http://127.0.0.1:8000/api/course').then(res => {
      this.setState({
        courses: res.data
      })
    }).then(() => {
      console.log(this.state.courses)
      for (const course of this.state.courses) {
        if (course.course_number === courseNumber) {
          return true
        }
      }
      return false
    })
  }

  /* istanbul ignore next */
  async uploadFile () {
    if (document.getElementById('file').files.length === 0) {
      return alert('Please Select File')
    }
    const file = document.getElementById('file').files[0]
    if (!file || file.type !== 'application/pdf') {
      return alert('Please Select PDF File')
    }
    const base64 = (await this.toBase64(file)).split(',')[1]
    const binary = atob(base64)
    const array = []
    for (let i = 0; i < binary.length; ++i) {
      array.push(binary.charCodeAt(i))
    }
    const blobData = new Blob([new Uint8Array(array)], { type: 'application/pdf' })
    const response = await fetch('https://dlorx585o9.execute-api.us-west-1.amazonaws.com/v1/upload', {
      headers: { 'Content-Type': 'application/pdf' },
      method: 'POST',
      body: blobData
    }).then(response => response.json())
    console.log(response)
    return response
  }

  /* istanbul ignore next */
  async handleSubmit (event) {
    event.preventDefault()
    const userID = Cookies.get('user_id') - 0

    const fileName = document.getElementById('fileName').value
    if (fileName.trim().length === 0) {
      alert('The file name can not be empty')
      return
    }
    // const courseNumber = document.getElementById('courseNumber').value
    const courseNumber = this.state.selectedCourse
    if (!await this.isCourseNumberValid(courseNumber)) {
      alert('The course number is not valid')
      return
    }
    const description = document.getElementById('description').value
    if (description.trim().length === 0) {
      alert('The description can not be empty')
      return
    }
    const uploadResponse = await this.uploadFile()
    const currTime = moment().format('YYYY-MM-DD HH:mm:ss')
    if (!uploadResponse) {
      return
    }
    const fileUrl = uploadResponse.body.file_url
    const data = {
      file_name: fileName,
      file_url: fileUrl,
      description: description,
      user_id: userID,
      course_number: courseNumber,
      time: currTime
    }
    console.log(data)
    axios.post('http://localhost:8000/api/note/', data)
      .then(response => {
        console.log(response)
        window.location.href = '/airnote/note/' + response.data.id
      })
      .catch(err => console.log(err))
  }

  /* istanbul ignore next */
  render () {
    return (
      <div style={{ height: '80vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div className='row justify-content-center align-self-center'>
          <Form className='card bg-white'>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', background: '#17A2B8', height: '80px' }}>
              <h1 className='text-white m-0 p-0'>Add Your Note</h1>
            </div>
            <div className='p-3'>
              <div className='form-row'>
                <div className='form-group p-1'>
                  <label htmlFor='fileName'>File Name</label>
                  <input className='form-control' type='text' placeholder='File name' id='fileName' required />
                </div>
                <div className='form-group p-1'>
                  <label htmlFor='courseNumber'>Course Number</label>
                  <CourseAutoComplete courses={this.state.courses} handleSelectCourse={this.onHandleSelectCourse} />
                  {/* <input className='form-control' type='text' placeholder='Course Number' id='courseNumber' required /> */}
                </div>
              </div>
              <div className='form-group'>
                <label htmlFor='description'>Description</label>
                <textarea className='form-control' placeholder='Description' id='description' rows='5' required />
              </div>
              <div className='form-group'>
                <label htmlFor='file'>Upload your file</label>
                <input className='form-control-file' type='file' name='file' id='file' required />
              </div>
            </div>
            <button className='btn btn-primary' type='submit' onClick={(event) => this.handleSubmit(event)}>Submit</button>
          </Form>
        </div>
      </div>
    )
  }
}

export default UploadForm
