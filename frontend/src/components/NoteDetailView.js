import * as React from 'react'
import axios from 'axios'
import Preview from './Preview'
import CommentListView from './CommentListView'
import Vote from './Vote'
import { Button, Col, Container, Jumbotron, Row } from 'react-bootstrap'
import Favorite from './Favorite'
import DeleteNote from './DeleteNote'

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

  getData = async () => {
    const noteID = this.props.match.params.noteID
    await axios.get(`http://127.0.0.1:8000/api/note/${noteID}`)
      .then(async (res) => {
        /* istanbul ignore else  */
        if (res.data.length !== 0) {
          this.setState({
            note: res.data,
            comments: res.data.comments
          })
          await axios.get(`http://127.0.0.1:8000/api/user/${res.data.user_id}`)
            .then(res => {
              this.setState({
                ...this.state,
                first_name: res.data.first_name,
                last_name: res.data.last_name
              })
            })
        }
      }).catch(() => alert('cannot get note info.'))
  }

  async componentDidMount () {
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
          <div className='col-md-12'>
            <Row>
              <div className='col-md-1' />
              <Col className='col-md-1 mt-auto mb-auto'>
                <Favorite note_id={this.state.note.id} />
                <div className='pb-2' />
                <Vote note={this.state.note} />
              </Col>
              <Col className='col-md-8'>
                <Preview url={this.state.note.file_url} />
              </Col>
            </Row>
            <Row className='pt-2 pb-3'>
              <div className='col-md-2' />
              <Col className='col-md-8'>
                <Row>
                  <Col>
                    <a href={this.state.note.file_url}>
                      <Button variant='info' style={{ width: '150px' }}> Download File </Button>
                    </a>
                  </Col>
                  <Col>
                    <div className='float-right'><DeleteNote note={this.state.note} /></div>
                  </Col>
                </Row>
              </Col>
            </Row>
            <Row>
              <div className='col-md-2' />
              <div style={{ width: '100%' }} className='col-md-8'>
                <CommentListView note={this.state.note} />
              </div>
            </Row>
          </div>
        </div>
      </div>
    )
  }
}

export default NoteDetailView
