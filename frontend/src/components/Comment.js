import * as React from 'react';
import 'antd/dist/antd.css';
import { Comment as CommentDesign, Tooltip, Avatar, Typography } from 'antd';
import moment from 'moment';

const { Text } = Typography;

export default function Comment (props) {
        return (
            <CommentDesign
                // author={<a>{Cookies.get('last_name')} {Cookies.get('first_name')}</a>}
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

