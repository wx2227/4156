import React from 'react'
import 'antd/dist/antd.css'
import { Comment, Avatar, Form, Button, Input } from 'antd'
import moment from 'moment'
import axios from '../services/axios'
import Cookies from 'js-cookie'

const { TextArea } = Input

const Editor = ({ onChange, onSubmit, submitting, value }) => (
  <>
    <Form.Item>
      <TextArea rows={4} onChange={onChange} value={value} />
    </Form.Item>
    <Form.Item>
      <Button htmlType='submit' loading={submitting} onClick={onSubmit} type='primary'>
        Add Comment
      </Button>
    </Form.Item>
  </>
)

class CommentEditor extends React.Component {
  constructor (props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.state = {
      comment: {
        user_id: Cookies.get('user_id'),
        note_id: props.note.id,
        time: null,
        content: ''
      },
      loading: false,
      value: ''
    }
  }

  componentDidUpdate (prevProps) {
    if (this.props.note !== prevProps.note) {
      this.setState({
        comment: {
          ...this.state.comment,
          user_id: Cookies.get('user_id'),
          note_id: this.props.note.id
        }
      })
    }
  }

    handleChange = (e) => {
      this.setState({
        ...this.state,
        value: e.target.value
      })
    };

    handleSubmit = () => {
      if (this.state.value.split(' ').join('') === '') {
        alert('blank comment cannot be posted.')
        return
      }

      this.setState({
        ...this.state,
        loading: true,
        comment: {
          ...this.state.comment
        }
      })

      axios.post('http://127.0.0.1:8000/api/comment/', {
        content: this.state.value,
        user_id: this.state.comment.user_id,
        note_id: this.state.comment.note_id,
        time: moment().format('YYYY-MM-DD HH:mm:ss')
      })
        .then(res => {
          if (res.error) {
            this.setState({ loading: false })
          } else {
            // clear the message box
            this.setState({
              value: '',
              loading: false,
              comment: {
                ...this.state.comment,
                content: this.state.value,
                time: res.data.time
              }
            })
            this.props.addComment(this.state.comment)
            this.setState({
              ...this.state,
              value: '',
              comment: {
                ...this.state.comment,
                time: null,
                content: ''
              }
            })
          }
        })
    };

    render () {
      return (
        <>
          <Comment
            avatar={
              <Avatar
                src={Cookies.get('url')}
              />
                    }
            content={
              <Editor
                onChange={this.handleChange}
                onSubmit={this.handleSubmit}
                submitting={this.state.loading}
                value={this.state.value}
              />
                    }
          />
        </>
      )
    }
}

export default CommentEditor
