import * as React from 'react';
import { createElement } from 'react';
import 'antd/dist/antd.css';
import { Tooltip } from 'antd';
import { DislikeOutlined, LikeOutlined, DislikeFilled, LikeFilled } from '@ant-design/icons';
import axios from 'axios';

class Vote extends React.Component {

    constructor(props) {
        super(props);
        this.state= {
            note: [],
            likes: 0,
            dislikes: 0,
            action: null,
            voted: false
        }

        this.like = this.like.bind(this)
        this.dislike = this.dislike.bind(this)
    }

    // componentDidMount () {
    // }

  componentDidUpdate (prevProps) {
        if (this.props.note !== prevProps.note){
          axios.get(`http://127.0.0.1:8000/api/vote/?user_id=${this.props.note.user_id}&note_id=${this.props.note.id}`)
            .then(res => {
              console.log(res)
              if (res.data.length !== 0) {
                const action = res.data[0]['vote'] === 1 ? 'liked' : 'disliked';
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

    like() {
        if (this.state.action === 'liked') {
            return
        }

        axios.post(`http://127.0.0.1:8000/api/vote/`, {
            vote: 1,
            user_id: this.state.note.user_id,
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
            }).catch(() => {alert("Cannot post vote info")});
    }

    dislike(){
        if (this.state.action === 'disliked') {
          return;
        }

        axios.post(`http://127.0.0.1:8000/api/vote/`, {
            vote: -1,
            user_id: this.state.note.user_id,
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
            }).catch(() => {alert("Cannot post vote info")});
    }

    render() {

        return (
            <div>
                <Tooltip key="comment-basic-like" title="Like">
                <span onClick={this.like}>
                {createElement(this.state.action === 'liked' ? LikeFilled : LikeOutlined)}
                    <span className="comment-action">{this.state.likes}</span>
                </span>
                </Tooltip>
                <span className="pr-1"> </span>
                <Tooltip key="comment-basic-dislike" title="Dislike">
                <span onClick={this.dislike}>
                {createElement(this.state.action === 'disliked' ? DislikeFilled : DislikeOutlined)}
                    <span className="comment-action">{this.state.dislikes}</span>
                </span>
                </Tooltip>
            </div>
        )
    }
}

export default Vote;