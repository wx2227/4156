import * as React from 'react'
import axios from 'axios'
import Notes from './Notes'
import 'antd/dist/antd.css'
import { Button, Container, Jumbotron } from 'react-bootstrap'

class NotesListView extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      notes: [],
      course: {}
    }
  }

  componentDidMount () {
    const courseNumber = this.props.match.params.course_number
    if (courseNumber === undefined) {
      axios.get('http://localhost:8000/api/note/')
        .then(res => {
          this.setState({
            notes: res.data
          })
        }).catch(() => {
          alert('Cannot get note form server')
        }
        )
    } else {
      axios.get(`http://localhost:8000/api/note/?course_number=${courseNumber}`)
        .then(res => {
          this.setState({
            notes: res.data
          })
        }).catch(() => {
          alert('Please input a valid course number.')
        }
        )
    }
    axios.get(`http://localhost:8000/api/course/?course_number=${courseNumber}`)
      .then(res => {
        this.setState({
          ...this.state,
          course: res.data[0]
        })
      }).catch(() => {
        alert('Cannot get course form server')
      })
  }

  render () {
    return (
      <div>
        <Jumbotron fluid style={{ background: '#494342' }} className='h-20'>
          {
              this.state.course
                ? <Container>
                  <h1 className='text-white'>{this.state.course.course_number}</h1>
                  <h2 className='text-white'>{this.state.course.course_name}</h2>
                  <p>
                    <Button variant='outline-success' style={{ marginRight: '10px' }} onClick={this.handleClick}>+ Add Note</Button>
                  </p>
                  </Container>
                : <Container>
                  <h1 className='text-white'>Air Notes</h1>
                  </Container>
            }
        </Jumbotron>
        <div className='row justify-content-center' style={{ background: '#fff', minHeight: 500 }}>
          <div className='col-md-8' align='center'>
            <Notes notes={this.state.notes} course={this.state.course} />
          </div>
        </div>
      </div>
    )
  }
}

export default NotesListView
