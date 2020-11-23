import * as React from 'react'
import Comment from './Comment.js'
import { List } from 'antd'
import CommentEditor from './CommentEditor'
import Cookies from 'js-cookie'

class CommentListView extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      comments: [],
      note: []
    }
    this.addComment = this.addComment.bind(this)
  }

  addComment (comment) {
    this.setState(prevState => {
      comment = {
        ...comment,
        user_info: { avatar: Cookies.get('url') }
      }
      return {
        comments: [comment, ...prevState.comments]
      }
    })
  }

  componentDidUpdate (prevProps) {
    if (this.props.note !== prevProps.note) {
      this.setState({
        comments: this.props.note.comments.reverse(),
        note: this.props.note
      })
    }
  }

  render () {
    return (
      <>
        <List
          pagination={{
            onChange: page => {
              console.log(page)
            },
            pageSize: 5
          }}
          dataSource={this.state.comments}
          itemLayout='horizontal'
          renderItem={props => <Comment comment={props} />}
        />
        <CommentEditor addComment={this.addComment} note={this.state.note} />
      </>
    )
  }
}

export default CommentListView
