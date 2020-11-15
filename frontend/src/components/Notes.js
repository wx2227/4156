import React from 'react'
import axios from 'axios'
import {List, Statistic} from "antd";
import {DislikeOutlined, LikeOutlined} from "@ant-design/icons";
import { Card, Row, Col } from 'antd';
import 'antd/dist/antd.css';
import './Notes.css';

const { Meta } = Card;

function Notes(props) {
    let noteRows = []
    props.notes.map((note, i) =>{
        const rows = [...Array( Math.ceil(props.notes.length / 4) )];
        // chunk the products into the array of rows
        noteRows = rows.map( (row, idx) => props.notes.slice(idx * 4, idx * 4 + 4) );
    })
    return (
        <div>
            <List
                itemLayout="vertical"
                dataSource={noteRows}
                pagination={{
                    onChange: page => {
                        console.log(page);
                    },
                    pageSize: 5,
                }}
                renderItem={item => (
                    <List.Item>
                        <Row gutter={16}>
                            { item.map( note =>
                                <Col span={4} offset={1}>
                                    <Card
                                        title={note.file_name}
                                        cover={<img src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" />}
                                        actions={[
                                            <Statistic value={note.up_votes} prefix={<LikeOutlined/>}/>,
                                            <Statistic value={note.down_votes} prefix={<DislikeOutlined/>}/>,
                                        ]}
                                        extra={<a href={`/note/${note.id}`}>More</a>}
                                    >
                                        <Meta description={note.file_description} />
                                    </Card>
                                </Col>
                            )}
                        </Row>
                    </List.Item>
                )}
            />
        </div>
    );
}

export default Notes;
