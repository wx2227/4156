import React from 'react'
import axios from 'axios'
import {List, Statistic} from "antd";
import {DislikeOutlined, LikeOutlined} from "@ant-design/icons";


class Notes extends React.Component {
    state = {
        notes: []
    }

    componentDidMount() {
        axios.get('http://127.0.0.1:8000/api/note/')
            .then(res => {
                this.setState({
                    notes: res.data
                });
            })
    }

    render() {
        return (
            <List
                itemLayout="vertical"
                size="large"
                pagination={{
                    onChange: page => {
                        console.log(page);
                    },
                    pageSize: 5
                }}
                dataSource={this.props.notes}
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
                            title={<a href={`/note/${item.id}`}> {item.file_name} </a>}
                            description={item.description}
                        />
                    </List.Item>
                )}
            />
        )
    }
}

export default Notes;