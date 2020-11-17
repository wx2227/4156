//@flow
import React, { createElement, useState } from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import { Comment as CommentDesign, Tooltip, Avatar, Typography } from 'antd';
import moment from 'moment';
import axios from 'axios';

const { Text } = Typography;

export default function Comment (props) {
        return (
            <CommentDesign
                // author={<a>{this.state.user.first_name} {this.state.user.last_name}</a>}
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
}

