import React from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'
import { Image, CardDeck, Form, Card, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { faTrash as Trash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

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
      nickNameInput: '',
      page: 1
    }
  }

  componentDidMount = async () => {
    this.disableForms()
    await this.updateUserInfo()
  }

  updateUserInfo = async () => {
    const id = Cookies.get('user_id')
    await axios.get('http://localhost:8000/api/user/' + id)
      .then(res => {
      if (res.data) {
          this.setState({
            credits: res.data.credits,
            email: res.data.email,
            user_id: res.data.id,
            notes: res.data.notes,
            favorites: res.data.favorites,
            avatar: res.data.avatar,
            nickname: res.data.nick_name,
            comments: res.data.comments,
            role: (res.data.is_superuser ? 'Administrator' : 'Client'),
            nickNameInput: res.data.nick_name
          })
        }
      }).catch(err => { console.log(err.stack) })
  }

  componentDidUpdate () {
    if (this.state.page === 1 && !this.state.edit) {
      this.disableForms()
    }
  }

  disableForms = () => {
    const forms = document.getElementsByClassName('userInfo')
    for (let i = 0; i < forms.length; i++) {
      forms[i].style.border = 'none'
      forms[i].disabled = true
      forms[i].style.background = 'white'
      forms[i].style.color = 'black'
    }
  }

  handleClickEdit = () => {
    const forms = document.getElementsByClassName('editable')
    for (let i = 0; i < forms.length; i++) {
      forms[i].style.border = 'thin solid black'
      forms[i].disabled = false
      forms[i].style.background = 'white'
      forms[i].style.color = 'black'
    }

    this.setState({
      edit: true
    })
  }

  handleClickCancel = () => {
    this.disableForms()
    document.getElementById('avatar').src = this.state.avatar
    document.getElementById('nickname').value = this.state.nickname
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

  renderProfilePage () {
    return (
      <>
        <div className='col-8'>
          {this.renderUserInfo()}
        </div>
        <div className='col-3'>
          <div className='container'>
            <div className='row'>
              <div className='col'>
                <Image id='avatar' src={this.state.avatar} alt='...' className='rounded mx-auto d-block ' roundedCircle style={{ height: '350px', width: '350px', borderRadius: '50' }} />
              </div>
              {this.state.edit &&
                <Form style={{ marginLeft: '90px', marginTop: '50px' }}>
                  <Form.Group>
                    <Form.File id='imageUpload' onChange={this.handlePreviewImage} />
                  </Form.Group>
                </Form>}
            </div>
            <div className='row' />
          </div>
        </div>
      </>

    )
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
            <ul className='list-group' style={{ fontSize: '16px', background: 'white' }}>
              <li className='list-group-item border-0'>
                <input type='text' className='form-control editable userInfo' id='nickname' aria-label='Default' aria-describedby='inputGroup-sizing-default' value={this.state.nickNameInput} onChange={this.handleNickNameInput} />
              </li>
              <li className='list-group-item border-0'>
                <input type='text' className='form-control userInfo' aria-label='Default' aria-describedby='inputGroup-sizing-default' value={this.state.role} />
              </li>
              <li className='list-group-item border-0'>
                <input type='text' className='form-control userInfo' aria-label='Default' aria-describedby='inputGroup-sizing-default' value={this.state.credits} />
              </li>
              <li className='list-group-item border-0'>
                <input type='text' className='form-control userInfo' aria-label='Default' aria-describedby='inputGroup-sizing-default' value={this.state.email} />
              </li>
              <li className='list-group-item border-0'>
                <input type='text' className='form-control userInfo' aria-label='Default' aria-describedby='inputGroup-sizing-default' value={this.state.favorites.length} />
              </li>
              <li className='list-group-item border-0'>
                <input type='text' className='form-control userInfo' aria-label='Default' aria-describedby='inputGroup-sizing-default' value={this.state.notes.length} />
              </li>
              <li className='list-group-item border-0'>
                <input type='text' className='form-control userInfo' aria-label='Default' aria-describedby='inputGroup-sizing-default' value={this.state.comments.length} />
              </li>
            </ul>
          </div>
        </div>
        <div className='row' id='EditCancel'>
          {!this.state.edit &&
            <div className='col-md-2 offset-md-2'>
              <button type='button' id='editButton' className='btn btn-primary rounded' onClick={this.handleClickEdit} style={{ width: '80px' }}>Edit</button>
            </div>}
          {this.state.edit &&
            <div className='col-md-2 offset-md-2'>
              <button type='button' id='editButton' className='btn btn-primary rounded' style={{ width: '80px' }}>Save</button>
            </div>}
          {this.state.edit &&
            <div className='col'>
              <button type='button' className='btn btn-light rounded' onClick={this.handleClickCancel} style={{ width: '80px', marginLeft: '30px' }}>Cancel</button>
            </div>}
        </div>
      </div>
    )
  }

  handlePreviewImage = (e) => {
    const reader = new FileReader()
    reader.readAsDataURL(e.target.files[0])
    reader.onloadend = () => {
      document.getElementById('avatar').src = [reader.result]
    }
  }

  getButtonClass = (page) => {
    if (page === this.state.page) {
      return 'btn btn-primary rounded-0'
    } else {
      return 'btn btn-light rounded-0 '
    }
  }

  setPage = (p) => {
    this.setState({
      page: p
    })
  }

  renderFavorites () {
    return this.renderNoteList(this.state.favorites)
  }

  renderUserNotes () {
    return this.renderNoteList(this.state.notes)
  }

  deleteComment = async (id) => {
    await axios.delete('http://localhost:8000/api/comment/' + id)
      .then(res => {
        this.updateUserInfo()
        return res
      }).catch(err => { console.log(err.stack) })
  }

  deleteNote = async (id) => {
    await axios.delete('http://localhost:8000/api/note/' + id)
      .then(res => {
        this.updateUserInfo()
        return res
      }).catch(err => { console.log(err.stack) })
  }

  deleteFavorite = async (id) => {
    await axios.delete('http://localhost:8000/api/favorite/' + id)
      .then(res => {
        this.updateUserInfo()
        return res
      }).catch(err => { console.log(err.stack) })
  }

  renderNoteList = (notes) => {
    const noteRows = []
    console.log(notes)

    for (let i = 0; i < notes.length; i += 3) {
      const rows = []
      for (let j = 0; j < 3 && (i + j) < notes.length; j++) {
        rows.push(notes[j + i])
      }
      noteRows.push(rows)
    }

    return (
      noteRows.map(row =>
        <Row className='pb-3 ml-5 pl-4 mt-4' key={row.id}>
          {row.map(note =>
            <CardDeck className='pr-5 pl-4' key={note.note_info ? note.note_info.id : note.id}>
              <Card border='info' style={{ textDecoration: 'none', width: '15rem', height: '13rem' }}>

                <Card.Header><b className='pr-5'>{note.note_info ? note.note_info.course_number : note.course_number} </b>
                  <FontAwesomeIcon className='ml-5' icon={Trash} size='1x' style={{ color: '#FF0000', cursor: 'pointer' }} onClick={note.note_info ? async () => { await this.deleteFavorite(note.id) } : async () => {await this.deleteNote(note.id) }} />
                </Card.Header>
                <Link to={`/airnote/note/${note.note_info ? note.note_info.id : note.id}`}>
                  <Card.Body style={{ color: 'Black' }}>
                    <Card.Title>{note.note_info ? note.note_info.file_name : note.file_name}</Card.Title>
                    <Card.Text>{note.note_info ? note.note_info.description : note.description}</Card.Text>
                  </Card.Body>
                </Link>
              </Card>

            </CardDeck>
          )}
        </Row>
      )
    )
  }

  renderUserComments () {
    console.log(this.state.comments)
    return (
      this.state.comments.map(comment =>
        <Row className='pb-4 ml-5 pl-5 mt-2 mb-4' key={comment.id} style={{ width: '60rem', height: '6.5rem' }}>
          <Card border='info' style={{ textDecoration: 'none', width: '60rem', height: '6.5rem' }}>
            <Card.Header style={{ height: '2.5rem' }}>{comment.time.slice(0, 10)}
              <FontAwesomeIcon className='ml-5' icon={Trash} size='1x' style={{ color: '#FF0000', cursor: 'pointer', float: 'right' }} onClick={async () => { await this.deleteComment(comment.id) }} />
            </Card.Header>
            <Link to={`/airnote/note/${comment.note_id}`}>
              <Card.Body style={{ color: 'Black' }}>
                <Card.Text>{comment.content}</Card.Text>
              </Card.Body>
            </Link>
          </Card>

        </Row>
      )
    )
  }

  renderRightContent = () => {
    if (this.state.page === 1) {
      return this.renderProfilePage()
    } else {
      return (
        <div>
          {this.state.page === 2 && this.renderFavorites()}
          {this.state.page === 3 && this.renderUserNotes()}
          {this.state.page === 4 && this.renderUserComments()}
        </div>
      )
    }
  }

  render () {
    return (
      <>
        <div className='container' style={{ paddingTop: '80px' }}>
          <div className='row' style={{ minHeight: '750px' }}>
            <div className='col-1 border-right'>
              <div className='float-right'>
                <div className='list-group list-group-flush'>
                  <button type='button' className={this.getButtonClass(1)} onClick={() => { this.setPage(1) }}>Profile</button>
                  <button type='button' className={this.getButtonClass(2)} onClick={() => { this.setPage(2) }}>Favorites</button>
                  <button type='button' className={this.getButtonClass(3)} onClick={() => { this.setPage(3) }}>Notes</button>
                  <button type='button' className={this.getButtonClass(4)} onClick={() => { this.setPage(4) }}>Comments</button>
                </div>
              </div>
            </div>
            {this.renderRightContent()}
          </div>
        </div>
      </>
    )
  }
}

export default PersonalPage
