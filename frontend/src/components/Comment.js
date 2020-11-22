import * as React from 'react'
import 'antd/dist/antd.css'
import { Comment as CommentDesign, Tooltip, Avatar, Typography } from 'antd'
import moment from 'moment'
import axios from 'axios'

const { Text } = Typography

class Comment extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      url: ""
    }
  }

  componentDidUpdate () {
    axios.get(`http://127.0.0.1:8000/api/user/${this.props.comment.user_id}`)
      .then(res =>
        this.setState({
          url: res.data.avatar
        })
      ).catch(() => alert("cannot get user info"))
  }

  render () {
    return (
      <CommentDesign
        avatar={
          <Avatar
            src={this.state.url}
          />
        }
        content={
          <Text>{this.props.comment.content}</Text>
        }
        datetime={
          <Tooltip title={moment(this.props.comment.time).format('YYYY-MM-DD HH:mm:ss')}>
            <span>{moment(this.props.comment.time).fromNow()}</span>
          </Tooltip>
        }
      />
    )
  }
  }

export default Comment;
