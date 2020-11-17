//@flow
import React, { createElement, useState } from 'react';
import 'antd/dist/antd.css';
import { Tooltip, Comment } from 'antd';
import { DislikeOutlined, LikeOutlined, DislikeFilled, LikeFilled } from '@ant-design/icons';
import axios from 'axios';


class Vote extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            likes: 0,
            dislikes: 0,
            action: null
        }
        this.handleUpVote = this.handleUpVote.bind(this);
        this.handleDownVote = this.handleDownVote.bind(this);
    }

    componentDidMount() {
        this.setState({
            likes: this.props.note.up_votes,
            dislikes: this.props.note.down_votes
        })
    }

    handleUpVote(e) {
        this.props.onUpVoteChange(e.target.value);
    }

    handleDownVote(e) {
        this.props.onDownVoteChange(e.target.value);
    }

    like = () => {
        axios.post(`http://127.0.0.1:8000/api/vote/`, {
            vote: 1,
            user_id: this.props.user_id,
            note_id: this.props.note.id
        })
            .then(res => {
                this.setState({
                    likes: this.props.note.up_votes + 1,
                    dislikes: this.props.note.down_votes,
                    action: 'liked'});
            }).catch(err => {alert("Cannot post vote info")});
    };

    dislike = () => {
        axios.post(`http://127.0.0.1:8000/api/vote/`, {
            vote: -1,
            user_id: this.props.user_id,
            note_id: this.props.note.id
        })
            .then(res => {
                this.setState({
                    likes: this.props.note.up_votes,
                    dislikes: this.props.note.down_votes+1,
                    action: 'disliked'});
            }).catch(err => {alert("Cannot post vote info")});
    };


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