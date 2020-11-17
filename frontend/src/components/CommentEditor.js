import React from 'react';
import 'antd/dist/antd.css';
import { Comment, Avatar, Form, Button, List, Input } from 'antd';
import moment from 'moment';
import axios from 'axios';

const { TextArea } = Input;

const Editor = ({ onChange, onSubmit, submitting, value }) => (
    <>
        <Form.Item>
            <TextArea rows={4} onChange={onChange} value={value} />
        </Form.Item>
        <Form.Item>
            <Button htmlType="submit" loading={submitting} onClick={onSubmit} type="primary">
                Add Comment
            </Button>
        </Form.Item>
    </>
);


// Todo
// render user data in the comment header
class CommentEditor extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            comment: {
                user_id: props.note.user_id,
                note_id: props.note.id,
                time: null,
                content: ""
            },
            loading: false,
            value: ""
        }
    }

    handleChange = e => {
        this.setState({
            ...this.state,
            value: e.target.value,
            comment: {
                ...this.state.comment,
                content: e.target.value
            },
        });
    };

    handleSubmit = (e) => {

        if (this.value === "") {
            return
        }

        this.setState({
            loading: true,
            comment: {
                content: this.state.comment.content,
                user_id: this.props.note.user_id,
                note_id: this.props.note.id,
                time: moment().format('YYYY-MM-DD HH:mm:ss')
            }
        });

        let { comment } = this.state;
        axios.post(`http://127.0.0.1:8000/api/comment/`, {
            content: this.state.comment.content,
            user_id: this.props.note.user_id,
            note_id: this.props.note.id,
            time: moment().format('YYYY-MM-DD HH:mm:ss')
        })
            .then(res => {
                if (res.error) {
                    this.setState({ loading: false });
                } else {
                    // clear the message box
                    this.setState({
                        value: "",
                        loading: false,
                        comment: { ...comment, content: "" }
                    });
                    this.props.addComment(comment);
                }
            })
    };

    render() {
        const { comments, submitting, value } = this.state;

        return (
            <>
                <Comment
                    avatar={
                        <Avatar
                            src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                            alt="Han Solo"
                        />
                    }
                    content={
                        <Editor
                            onChange={((e)=>this.handleChange(e))}
                            onSubmit={((e)=>this.handleSubmit(e))}
                            submitting={submitting}
                            value={value}
                        />
                    }
                />
            </>
        );
    }
}

export default CommentEditor;