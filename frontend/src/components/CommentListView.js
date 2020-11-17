//@flow
import * as React from 'react';
import Comment from './Comment.js'
import {List, Form, Input, Button, Avatar, Comment as CommentAnt} from 'antd';
import moment from 'moment';

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


class CommentListView extends React.Component{
    constructor(props) {
        super(props);
        console.log(this.props);
    }

    render() : React.Node {
        return (
            <div>
                {
                    <List
                        pagination={{
                            onChange: page => {
                                console.log(page);
                            },
                            pageSize: 5,
                        }}
                        dataSource={this.props.comments}
                        itemLayout="horizontal"
                        renderItem={props => <Comment comment={props} />}
                    />
                }
                {/*<CommentList comments={this.props.comments} />*/}
            </div>
        );
    }
}

export default CommentListView;
