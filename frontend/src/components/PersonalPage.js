import React from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'
import { Form } from 'react-bootstrap'

class PersonalPage extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      credits: 0,
      user_id: -1,
      nickname: '',
      email: '',
      notes: [],
      favorites: [],
      avatar: '',
      comments: [],
      role: '', 
      edit: false,
      nickNameInput: ''
    }
  }

  componentDidMount () {
    const id = Cookies.get('user_id')
    this.disableForms()
    axios.get('http://localhost:8000/api/user/?id=' + id)
      .then(res => {
        if (res.data.length !== 0) {
          console.log(res.data[0])
          this.setState({
            credits: res.data[0].credits,
            email: res.data[0].email,
            user_id: res.data[0].id,
            notes: res.data[0].notes,
            favorites: res.data[0].favorites,
            avatar: res.data[0].avatar,
            nickname: res.data[0].nick_name,
            comments: res.data[0].comments,
            role: (res.data[0].is_superuser ? 'Administrator' : 'Client'),
            nickNameInput: res.data[0].nick_name
          })
        }
      }).catch(err => { console.log(err.stack) })
    
      
  }

  disableForms = () => {
          var forms = document.getElementsByClassName("form-control")
      for (var i = 0; i < forms.length; i++) {
        forms[i].style.border = "none"
        forms[i].disabled = true
        forms[i].style.background = "white"
        forms[i].style.color = "black"
  }
  
  }

  handleClickEdit = () => {
       var forms = document.getElementsByClassName("editable")
      for (var i = 0; i < forms.length; i++) {
        forms[i].style.border = "thin solid black"
        forms[i].disabled = false
        forms[i].style.background = "white"
        forms[i].style.color = "black"
      }

    
    this.setState({
      edit: true
    })
  }

  handleClickCancel = () => {
    this.disableForms();
        document.getElementById("avatar").src = this.state.avatar
        document.getElementById("nickname").value = this.state.nickname
      this.setState({
      edit: false,
      nickNameInput: this.state.nickname
    })
  }

  handleNickNameInput = (e) => {
    this.setState({
      nickNameInput: e.target.value
    })
  }

  renderUserInfo () {
    return (
      <div className='container pl-5 pt-1 borderless'>
        <div className='row' style={{ height: '550px' }}>
          <div className='col-4'>
            <ul className='list-group pt-1' style={{ fontSize: '16px', fontWeight: 'bold' }}>
              <li className='list-group-item border-0' style={{ height: '62px' }}>Nickname:</li>
              <li className='list-group-item border-0' style={{ height: '62px' }}>Role:</li>
              <li className='list-group-item border-0' style={{ height: '62px' }}>Credits:</li>
              <li className='list-group-item border-0' style={{ height: '62px' }}>Email:</li>
              <li className='list-group-item border-0' style={{ height: '62px' }}>Favorites:</li>
              <li className='list-group-item border-0' style={{ height: '62px' }}>Notes submitted:</li>
              <li className='list-group-item border-0' style={{ height: '62px' }}>My comments: </li>
            </ul>
          </div>
          <div className='col-7'>
            <ul className='list-group' style={{ fontSize: '16px', background: 'white'}}>
              <li className='list-group-item border-0'>
                <input type='text' className='form-control editable' id="nickname" aria-label='Default' aria-describedby='inputGroup-sizing-default' value={this.state.nickNameInput} onChange= {this.handleNickNameInput} />
              </li>
              <li className='list-group-item border-0'>
                <input type='text' className='form-control' aria-label='Default' aria-describedby='inputGroup-sizing-default' value={this.state.role} />
              </li>
              <li className='list-group-item border-0'>
                <input type='text' className='form-control' aria-label='Default' aria-describedby='inputGroup-sizing-default' value={this.state.credits} />
              </li>
              <li className='list-group-item border-0'>
                <input type='text' className='form-control' aria-label='Default' aria-describedby='inputGroup-sizing-default' value={this.state.email} />
              </li>
              <li className='list-group-item border-0'>
                <input type='text' className='form-control' aria-label='Default' aria-describedby='inputGroup-sizing-default' value={this.state.favorites.length} />
              </li>
              <li className='list-group-item border-0'>
                <input type='text' className='form-control' aria-label='Default' aria-describedby='inputGroup-sizing-default' value={this.state.notes.length} />
              </li>
              <li className='list-group-item border-0'>
                <input type='text' className='form-control' aria-label='Default' aria-describedby='inputGroup-sizing-default' value={this.state.comments.length} />
              </li>
            </ul>
          </div>
        </div>
        <div className='row' id="EditCancel">
         {!this.state.edit &&
          <div className='col-md-2 offset-md-2'>
            <button type='button' id="editButton" className='btn btn-primary rounded' onClick={this.handleClickEdit} style={{ width: '80px' }}>Edit</button>
          </div>
         }
         {this.state.edit && 
          <div className='col-md-2 offset-md-2'>
            <button type='button' id="editButton" className='btn btn-primary rounded'  style={{ width: '80px' }}>Save</button>
          </div>
         }
          {this.state.edit && 
          <div className='col'>
            <button type='button' className='btn btn-light rounded' onClick={this.handleClickCancel} style={{width: '80px', marginLeft: "30px"}}>Cancel</button>
          </div>}
        </div>
      </div>
    )
  }

  handlePreviewImage = (e) => {
  
      var reader = new FileReader()
     reader.readAsDataURL(e.target.files[0])
     reader.onloadend = (e) => {
       document.getElementById("avatar").src = [reader.result]
     }
  }
  render () {
    return (
      <>
        <div className='container' style={{ paddingTop: '80px' }}>
          <div className='row' style={{ height: '750px' }}>
            <div className='col-1 border-right'>
              <div className='float-right'>
                <div className='list-group list-group-flush'>
                  <button type='button' className='btn btn-primary rounded-0'>Profile</button>
                  <button type='button' className='btn btn-light rounded-0 '>Favorites</button>
                  <button type='button' className='btn btn-light rounded-0'>Notes</button>
                  <button type='button' className='btn btn-light rounded-0'>Comments</button>
                </div>
              </div>
            </div>
            <div className='col-8'>
              {this.renderUserInfo()}
            </div>
            <div className='col-3'>
              <div className='container'>
                <div className='row'>
                  <div className='col'>
                    <img id="avatar" src={this.state.avatar} alt='...' className='rounded mx-auto d-block ' style={{ height: '350px', width: '350px' }} />
                  </div>
                  {this.state.edit &&
                  <Form style={{marginLeft: "90px", marginTop:"50px"}}>
                    <Form.Group>
                      <Form.File id="imageUpload"  onChange={this.handlePreviewImage} />
                    </Form.Group>
                  </Form>
                  }
                </div>
                <div className='row' />
              </div>
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default PersonalPage
