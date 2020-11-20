import * as React from 'react'
import 'antd/dist/antd.css'
import { PageHeader, Descriptions } from 'antd'
import { Jumbotron, Container, Button, Row, Col } from 'react-bootstrap'
import Vote from './Vote'
import axios from 'axios'

const Content = ({ children }) => {
  return (
    <div>
      <div>{children}</div>
    </div>
  )
}

class NoteDetailTitle extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      note: [],
      first_name: '',
      last_name: ''
    }
  }

  componentDidUpdate (prevProps) {
    if (this.props.note !== prevProps.note) {
      axios.get(`http://127.0.0.1:8000/api/user/?id=${this.props.note.user_id}`)
        .then(res => {
          if (res.data.length !== 0) {
            this.setState({
              first_name: res.data[0].user.first_name,
              last_name: res.data[0].user.last_name
            })
          }
        }).catch(() => alert('cannot get user info.'))
      this.setState({
        ...this.state,
        note: this.props.note
      })
    }
  }

    renderContent = () => {
      return (
        <div>
          <Row>
            <Col>Created {this.state.last_name} {this.state.first_name}</Col>
            <Col>Creation Time {this.props.note.time}</Col>
          </Row>
          <Row>
            <Vote note={this.props.note} />
          </Row>
          <Row>
            <Col>{this.props.note.description}</Col>
          </Row>
        </div>
      )
    }

    handleClick = () => {
      window.location.href = '/airnote/upload'
    }

    render () {
      return (
        <div>
          <Content>{this.renderContent()}</Content>
          {/* <PageHeader */}
          {/*  className='site-page-header-responsive' */}
          {/*  onBack={() => window.history.back()} */}
          {/*  title={this.props.note.course_number} */}
          {/* > */}
          {/* </PageHeader> */}
        </div>
      )
    }
}

export default NoteDetailTitle
