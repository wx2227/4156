//@flow
import React from 'react'
import {List, Statistic} from "antd";
import {DislikeOutlined, LikeOutlined} from "@ant-design/icons";
import { Card, Row, Col, Divider } from 'antd';
import 'antd/dist/antd.css';
import './Notes.css';
import Text from "antd/es/typography/Text";

const { Meta } = Card;

function Notes(props) {
    let noteRows = []
    props.notes.map((note, i) =>{
        const rows = [...Array( Math.ceil(props.notes.length / 5) )];
        // chunk the notes into the array of rows
        noteRows = rows.map( (row, idx) => props.notes.slice(idx * 5, idx * 5 + 5) );
    })
    return (
        <div className={"notes-view-wrapper"}>
            <List
                split={false}
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
                        <Divider orientation="left"></Divider>
                        <Row justify={"space-between"}>
                            { item.map( note =>
                                <Col flex="180px">
                                    <Card
                                        hoverable
                                        size="small"
                                        title={note.file_name}
                                        cover={<img src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" />}
                                        actions={[
                                            <Text type="secondary">{note.up_votes} likes</Text>,
                                            <Text type="secondary">{note.up_votes} dislikes</Text>
                                        ]}
                                        extra={<a href={`/note/${note.id}`}>More</a>}
                                    >
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
