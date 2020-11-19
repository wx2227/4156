import * as React from 'react';
import Comment from './Comment.js'
import {List, Form, Input, Button, Avatar, Comment as CommentAnt} from 'antd';
import CommentEditor from './CommentEditor';

class CommentListView extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            comments: [],
            note: []
        }
        this.handleAddComment = this.handleAddComment.bind(this)
    }

    handleAddComment(comment) {
        this.setState(prevState => {
            return {
                comments: [comment, ...prevState.comments],
            }
        })
    }

    componentDidUpdate (prevProps): void {
        if (this.props.note !== prevProps.note) {
            this.setState({
                comments: this.props.note.comments.reverse(),
                note: this.props.note
            })
        }
    }

    render(){
        return (
            <>
                <List
                    pagination={{
                        onChange: page => {
                            console.log(page);
                        },
                        pageSize: 5,
                    }}
                    dataSource={this.state.comments}
                    itemLayout="horizontal"
                    renderItem={props => <Comment comment={props} />}
                />
                <CommentEditor addComment={this.handleAddComment} note={this.state.note}/>
            </>
        );
    }
}

export default CommentListView;
