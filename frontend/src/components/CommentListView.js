import React from 'react';
import Comment from "./Comment";
import {List, Statistic} from 'antd';
import {DislikeOutlined, LikeOutlined} from "@ant-design/icons";

class CommentList extends React.Component {

    render() {
        return (
            <List
                itemLayout="vertical"
                size="medium"
                pagination={{
                    onChange: page => {
                        console.log(page);
                    },
                    pageSize: 5
                }}
                dataSource={this.props.comments}
                renderItem={item => (
                    <Comment comment={item}/>
                )}
            />
        );
    }
}

export default CommentList;