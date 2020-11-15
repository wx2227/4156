import React, { createElement, useState } from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import { Comment as CommentDesign, Tooltip, Avatar, Typography } from 'antd';
import moment from 'moment';
import { DislikeOutlined, LikeOutlined, DislikeFilled, LikeFilled } from '@ant-design/icons';

const { Text } = Typography;

const Comment = (props) => {

    return (
        <CommentDesign
            author={<a>test</a>}
            avatar={
                <Avatar
                    src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                />
            }
            content={
                <Text>{props.comment.content}</Text>
            }
            datetime={
                <Tooltip title={moment(props.comment.time).format('YYYY-MM-DD HH:mm:ss')}>
                    <span>{moment(props.comment.time).fromNow()}</span>
                </Tooltip>
            }
        />
    );
};

export default Comment;
