//@flow
import React from 'react';
import Comment from './Comment.js'
import {List, Statistic, Form, Input, Button, Avatar, Comment as CommentAnt} from 'antd';
import moment from 'moment';
import axios from 'axios';

const { TextArea } = Input;

const CommentList = ({ comments }) => (
    <List
        pagination={{
            onChange: page => {
                console.log(page);
            },
            pageSize: 5,
        }}
        dataSource={comments}
        itemLayout="horizontal"
        renderItem={props => <Comment comment={props} />}
    />
);

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


class CommentListView extends React.Component {
    state = {
        comments: [],
        submitting: false,
        value: '',
    }

    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         comments: props.comments,
    //         submitting: false,
    //         value: '',
    //     }
    // }

    handleSubmit = () => {
        if (!this.state.value) {
            return;
        }

        this.setState({
            submitting: true,
        });

        setTimeout(() => {
            this.setState({
                submitting: false,
                value: '',
                comments: [
                    {
                        author: 'Han Solo',
                        avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
                        content: <p>{this.state.value}</p>,
                        datetime: moment().fromNow(),
                    },
                    ...this.state.comments,
                ],
            });
        }, 1000);
    };

    handleChange = e => {
        this.setState({
            value: e.target.value,
        });
    };

    render() {
        return (
            <div>
                <CommentList comments={this.state.comments} />
                <CommentAnt
                    avatar={
                        <Avatar
                            src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                            alt="Han Solo"
                        />
                    }
                    content={
                        <Editor
                            onChange={this.handleChange}
                            onSubmit={this.handleSubmit}
                            submitting={this.state.submitting}
                            value={this.state.value}
                        />
                    }
                />
            </div>
        );
    }
}

export default CommentListView;