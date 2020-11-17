//@flow
import * as React from 'react';
import 'antd/dist/antd.css';
import {  PageHeader, Descriptions  } from 'antd';
import Vote from './Vote';


type note = {
    course_number? : string,
    description? : string,
}
type props = {
    note : note 
}



const NoteDetailTitle = (props : props) : React.Node => {

    const Content = ({ children, extra }) => {
        return (
            <div className="content">
                <div className="main">{children}</div>
                <div className="extra">{extra}</div>
            </div>
        );
    };

    const renderContent = (column = 3) => (
        <div style={{display: "inline-block"}}>
            <Descriptions size="small" column={column}>
                <Descriptions.Item label="Created">Wan Xu</Descriptions.Item>
                <Descriptions.Item label="Creation Time">2018-01-10</Descriptions.Item>
                <Descriptions.Item label="Course Number">
                    {props.note.course_number}
                </Descriptions.Item>
                <Descriptions.Item label="Votes">
                    <Vote user_id={13} note={props.note}/>
                </Descriptions.Item>
            </Descriptions>
            <Descriptions size="small" column={1}>
                <Descriptions.Item label="Description">
                    {props.note.description}
                </Descriptions.Item>
            </Descriptions>
        </div>
    );

    return (
        <div>
            <PageHeader
                className="site-page-header-responsive"
                onBack={() => window.history.back()}
                title={props.note.course_number}
            >
                <Content>{renderContent()}</Content>
            </PageHeader>
        </div>
    )
}

export default NoteDetailTitle
