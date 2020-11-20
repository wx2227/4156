import * as React from 'react'
import axios from 'axios'
import Preview from './Preview'
import NoteDetailTitle from './NoteDetailTitle'
import CommentListView from './CommentListView'
import { Button, Container, Jumbotron } from 'react-bootstrap'

class NoteDetailView extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      note: [],
      comments: []
    }
  }

  getData () {
    const noteID = this.props.match.params.noteID
    axios.get(`http://127.0.0.1:8000/api/note/${noteID}`)
      .then(res => {
        this.setState({
          note: res.data,
          comments: res.data.comments
        })
      })
  }

  componentDidMount () {
    this.getData()
  }

  render () {
    return (
      <div>
        <div>
          <Jumbotron fluid style={{ background: '#494342' }}>
            <Container>
              <h2 className='text-white'>{this.state.note.file_name}</h2>
              <p>
                <Button variant='outline-success' style={{ marginRight: '10px' }} onClick={this.handleClick}>+ Add Note</Button>
              </p>
            </Container>
          </Jumbotron>
        </div>
        <div className='row'>
          <div className='col-md-2'> </div>
          <div className='col-md-8'>
            <div className='detail-container'>
              <NoteDetailTitle note={this.state.note} />
              <Preview url={this.state.note.file_url} />
              <div style={{ width: '100%' }} />
              <br />
              <a href={this.state.note.file_url}>
                <button className='btn btn-primary'> Download File </button>
              </a>
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
