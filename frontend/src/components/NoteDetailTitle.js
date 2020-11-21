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
    }
  }

  componentDidUpdate (prevProps) {
    if (this.props.note !== prevProps.note) {
      this.setState({
        note: this.props.note
      })
    }
  }

    renderContent = () => {
      return (
        <div>
          <Row>
            <Vote note={this.state.note} />
          </Row>
          <Row>
            <Col>{this.props.note.description}</Col>
          </Row>
        </div>
      )
    }

    render () {
      return (
        <div>
          <Content>{this.renderContent()}</Content>
        </div>
      )
    }
}

export default NoteDetailTitle
