import React from "react";
import { List, Avatar, Icon, Statistic, Col} from "antd";
import {MessageOutlined, LikeOutlined, DislikeOutlined} from '@ant-design/icons';

const Note = props => {
    console.log(props.notes);
    return (
        <List
            itemLayout="vertical"
            size="large"
            pagination={{
                onChange: page => {
                    console.log(page);
                },
                pageSize: 3
            }}
            dataSource={props.notes}
            renderItem={item => (
                <List.Item
                    key={item.title}
                    actions={[
                        <Statistic value={item.up_votes} prefix={<LikeOutlined />} />,
                        <Statistic value={item.down_votes} prefix={<DislikeOutlined />} />,
                    ]}
                    extra={
                        <img
                            width={272}
                            alt="logo"
                            src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
                        />
                    }
                >
                    <List.Item.Meta
                        // avatar={<Avatar src={item.file_name} />}
                        title={<a href={`/${item.file_url}`}> {item.file_name} </a>}
                        description={item.description}
                    />
                </List.Item>
            )}
        />
    );
};

export default Note;