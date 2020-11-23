import * as React from 'react'
import axios from 'axios'
import Preview from './Preview'
import CommentListView from './CommentListView'
import Vote from './Vote'
import { Button, Col, Container, Jumbotron, Row } from 'react-bootstrap'

class NoteDetailView extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      note: [],
      comments: [],
      first_name: '',
      last_name: ''
    }
  }

  getData () {
    const noteID = this.props.match.params.noteID
    axios.get(`http://127.0.0.1:8000/api/note/${noteID}`)
      .then(res => {
        if (res.data.length !== 0) {
          this.setState({
            note: res.data,
            comments: res.data.comments
            // first_name: res.data.user['first_name'],
            // last_name: res.data.user['last_name']
          })
        }
        axios.get(`http://127.0.0.1:8000/api/user/${res.data.user_id}`)
          .then(res => {
            console.log(res.data)
            if (res.data.length !== 0) {
              this.setState({
                ...this.state,
                first_name: res.data.first_name,
                last_name: res.data.last_name
              })
            }
          }).catch(() => alert('cannot get user info.'))
      })
  }

  componentDidMount () {
    this.getData()
  }

  render () {
    return (
      <div>
        <div>
          <Jumbotron fluid style={{ background: '#494342', maxHeight: '220px' }}>
            <Container>
              <h2 className='text-white pb-3'>{this.state.note.file_name}</h2>
              <Row>
                <Col className='col-md-2'><h6 className='text-white'>Created By:</h6></Col>
                <Col><h6 className='text-white'>{this.state.first_name} {this.state.last_name}</h6></Col>
              </Row>
              <Row className='text-white'>
                <Col className='col-md-2'><h6 className='text-white'>Creation Time:</h6></Col>
                <Col><h6 className='text-white'>{this.state.note.time}</h6></Col>
              </Row>
            </Container>
          </Jumbotron>
        </div>
        <div className='row'>
          <div className='col-md-2'> </div>
          <div className='col-md-8'>
            <div className='detail-container'>
              <Preview url={this.state.note.file_url} />
              <Row className='pt-2 pb-3'>
                <Col>
                  <div style={{ width: '100%' }} />
                  <a href={this.state.note.file_url}>
                    <Button variant='info'> Download File </Button>
                  </a>
                </Col>
                <Col className='d-flex justify-content-end'>
                  <Vote note={this.state.note} />
                </Col>
              </Row>
              <div style={{ width: '100%' }}>
                <CommentListView note={this.state.note} />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default NoteDetailView
