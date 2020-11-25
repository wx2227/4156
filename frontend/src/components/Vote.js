import * as React from 'react'
import { createElement } from 'react'
import 'antd/dist/antd.css'
import { Tooltip } from 'antd'
import { DislikeOutlined, LikeOutlined, DislikeFilled, LikeFilled } from '@ant-design/icons'
import axios from '../services/axios'
import Cookies from 'js-cookie'

class Vote extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      note: [],
      likes: 0,
      dislikes: 0,
      action: null,
      voted: false,
      user_id: Cookies.get('user_id')
    }
    this.handleLike = this.handleLike.bind(this)
    this.handleDislike = this.handleDislike.bind(this)
  }

  componentDidUpdate (prevProps) {
    if (this.props.note !== prevProps.note) {
      axios.get(`http://127.0.0.1:8000/api/vote/?user_id=${this.state.user_id}&note_id=${this.props.note.id}`)
        .then(res => {
          if (res.data.length !== 0) {
            let action
            const vote = res.data[0].vote
            if (vote === 1) {
              action = 'liked'
            } else if (vote === -1) {
              action = 'disliked'
            } else {
              action = null
            }
            this.setState({
              voted: true,
              action: action
            })
          }
        })
      this.setState({
        note: this.props.note,
        likes: this.props.note.up_votes,
        dislikes: this.props.note.down_votes
      })
    }
  }

  handleLike () {
    if (this.state.action === 'liked') {
      axios.post('http://127.0.0.1:8000/api/vote/', {
        vote: 0,
        user_id: this.state.user_id,
        note_id: this.state.note.id
      })
        .then(() => {
          this.setState({
            likes: this.state.likes - 1,
            action: null
          })
        }).catch(() => alert('cannot undo the operation.'))
      return
    }

    axios.post('http://127.0.0.1:8000/api/vote/', {
      vote: 1,
      user_id: this.state.user_id,
      note_id: this.state.note.id
    })
      .then(() => {
        if (this.state.action === 'disliked') {
          this.setState({
            likes: this.state.likes + 1,
            dislikes: this.state.dislikes - 1,
            action: 'liked'
          })
        } else {
          this.setState({
            likes: this.state.likes + 1,
            action: 'liked'
          })
        }
      }).catch(() => { alert('Cannot post vote info') })
  }

  handleDislike () {
    if (this.state.action === 'disliked') {
      axios.post('http://127.0.0.1:8000/api/vote/', {
        vote: 0,
        user_id: this.state.user_id,
        note_id: this.state.note.id
      })
        .then(() => {
          this.setState({
            dislikes: this.state.dislikes - 1,
            action: null
          })
        }).catch(() => alert('cannot undo the operation.'))
      return
    }

    axios.post('http://127.0.0.1:8000/api/vote/', {
      vote: -1,
      user_id: this.state.user_id,
      note_id: this.state.note.id
    })
      .then(() => {
        if (this.state.action === 'liked') {
          this.setState({
            likes: this.state.likes - 1,
            dislikes: this.state.dislikes + 1,
            action: 'disliked'
          })
        } else {
          this.setState({
            dislikes: this.state.dislikes + 1,
            action: 'disliked'
          })
        }
      }).catch(() => { alert('Cannot post vote info') })
  }

  render () {
    return (
      <div>
        <Tooltip key='comment-basic-like' title='Like'>
          <span onClick={this.handleLike}>
            {createElement(this.state.action === 'liked' ? LikeFilled : LikeOutlined)}
            <span className='comment-action'>{this.state.likes}</span>
          </span>
        </Tooltip>
        <span className='pr-1'> </span>
        <Tooltip key='comment-basic-dislike' title='Dislike'>
          <span onClick={this.handleDislike}>
            {createElement(this.state.action === 'disliked' ? DislikeFilled : DislikeOutlined)}
            <span className='comment-action'>{this.state.dislikes}</span>
          </span>
        </Tooltip>
      </div>
    )
  }
}

export default Vote
