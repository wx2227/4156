import React from 'react'
import { List, Card, Row, Col, Divider } from 'antd'

import 'antd/dist/antd.css'
import './Notes.css'
import Text from 'antd/es/typography/Text'

function Notes (props) {
  let noteRows = []

  props.notes.forEach(() => {
    const rows = [...Array(Math.ceil(props.notes.length / 5))]
    // chunk the notes into the array of rows
    noteRows = rows.map((row, idx) => props.notes.slice(idx * 5, idx * 5 + 5))
  })

  return (
    <div className='notes-view-wrapper'>
      <List
        split={false}
        itemLayout='vertical'
        dataSource={noteRows}
        pagination={{
          onChange: page => {
            console.log(page)
          },
          pageSize: 5
        }}
        renderItem={item => (
          <List.Item>
            <Divider orientation='left' />
            <Row justify='space-between'>
              {item.map(note =>
                <Col key={note.id} flex='180px'>
                  <Card
                    hoverable
                    size='small'
                    title={note.file_name}
                    cover={<img src='https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png' />}
                    actions={[
                      <Text key={note.id} type='secondary'>{note.up_votes} likes</Text>,
                      <Text key={note.id} type='secondary'>{note.up_votes} dislikes</Text>
                    ]}
                    extra={<a href={`/airnote/note/${note.id}`}>More</a>}
                  />
                </Col>
              )}
            </Row>
          </List.Item>
        )}
      />
    </div>
  )
}

export default Notes
