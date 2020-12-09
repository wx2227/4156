import * as React from 'react'
import axios from 'axios'
import Notes from './Notes'
import AddNote from './AddNote'
import 'antd/dist/antd.css'
import { Container, Jumbotron } from 'react-bootstrap'

class NotesListView extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      filtered: [],
      notes: [],
      course: null
    }
  }

  async componentDidMount (): void {
    const courseNumber = this.props.match.params.course_number
    await axios.get('http://localhost:8000/api/note/')
      .then(res => {
        this.setState({
          ...this.state,
          notes: res.data,
          filtered: res.data
        })
      }).catch(() => {
        alert('Cannot get note form server')
      })

    if (courseNumber) {
      const filtered = this.state.notes.filter(note => note.course_info.course_number.toLowerCase().includes(courseNumber.toLowerCase()))
      if (filtered.length !== 0) {
        this.setState({
          ...this.state,
          filtered: filtered,
          course: filtered[0].course_info
        })
      } else {
        this.setState({
          ...this.state,
          filtered: filtered
        })
      }
    }
  }

  componentDidUpdate (prevProps) {
    const courseNumber = this.props.match.params.course_number

    if (prevProps.match.params.course_number !== this.props.match.params.course_number) {
      /* istanbul ignore else  */
      if (this.state.notes.length !== 0 && courseNumber) {
        const filtered = this.state.notes.filter(note => note.course_info.course_number.toLowerCase().includes(courseNumber.toLowerCase()))

        const b = {}
        filtered.forEach(note => {
          b[note.course_info.course_number] = (b[note.course_info.course_number] || 0) + 1
        })

        if (Object.keys(b).length === 1) {
          this.setState({
            ...this.state,
            course: filtered[0].course_info,
            filtered: filtered
          })
        } else {
          this.setState({
            ...this.state,
            filtered: filtered,
            course: null
          })
        }
      } else if (courseNumber === '' || courseNumber === undefined) {
        this.setState({
          ...this.state,
          filtered: this.state.notes,
          course: null
        })
      }
    }
  }

  render () {
    return (
      <>
        <Jumbotron fluid style={{ background: '#494342' }} className='h-20'>
          <Container>
            {
              (this.state.course)
                ? (
                  <div>
                    <h1 className='text-white'>{this.state.course.course_number}</h1>
                    <h2 className='text-white'>{this.state.course.course_name}</h2>
                  </div>)
                : (<h1 className='text-white'>Air Notes</h1>)
            }
            <p>
              <AddNote />
            </p>
          </Container>
        </Jumbotron>
        <div className='row justify-content-center'>
          <div align='center' className='col-md-8'>
            <Notes notes={this.state.filtered} />
          </div>
        </div>
      </>
    )
  }
}

export default NotesListView
