import React from 'react';
import Comment from './Comment.js'
import {List, Statistic, Form, Input, Button, Avatar, Comment as CommentAnt} from 'antd';
import moment from 'moment';

const { TextArea } = Input;

const CommentList = ({ comments }) => (
    <List
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

// console.log(this.props.)

class CommentListView extends React.Component {

    state = {
        comments: this.props.comments,
        submitting: false,
        value: '',
    };

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
        const { comments, submitting, value } = this.state;
        console.log(comments);
        return (
            <div>
                {comments.length > 0 && <CommentList comments={comments} />}
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
                            submitting={submitting}
                            value={value}
                        />
                    }
                />
            </div>
        );
    }

    // render() {
    //     return (
    //         <div>
    //             <List
    //                 itemLayout="vertical"
    //                 size="medium"
    //                 pagination={{
    //                     onChange: page => {
    //                         console.log(page);
    //                     },
    //                     pageSize: 5
    //                 }}
    //                 dataSource={this.props.comments}
    //                 renderItem={item => (
    //                     <Comment comment={item}/>
    //                 )}
    //             />
    //         </div>
    //     );
    // }
}

export default CommentListView;