import * as React from 'react';
import 'antd/dist/antd.css';
import {  PageHeader, Descriptions  } from 'antd';
import Vote from './Vote';

const Content = ({ children}) => {
  return (
    <div className="content">
      <div className="main">{children}</div>
    </div>
  );
};

class NoteDetailTitle extends React.Component {

  renderContent = (column = 3) => (
    <div style={{display: "inline-block"}}>
      <Descriptions size="small" column={column}>
        <Descriptions.Item label="Created">Wan Xu</Descriptions.Item>
        <Descriptions.Item label="Creation Time">2018-01-10</Descriptions.Item>
        <Descriptions.Item label="Course Number">
          {this.props.note.course_number}
        </Descriptions.Item>
        <Descriptions.Item label="Votes">
          <Vote user_id={13} note={this.props.note}/>
        </Descriptions.Item>
      </Descriptions>
      <Descriptions size="small" column={1}>
        <Descriptions.Item label="Description">
          {this.props.note.description}
        </Descriptions.Item>
      </Descriptions>
    </div>
  );

  render() {
    return (
      <div>
        <PageHeader
          className="site-page-header-responsive"
          onBack={() => window.history.back()}
          title={this.props.note.course_number}
        >
          <Content>{this.renderContent()}</Content>
        </PageHeader>
      </div>
    )
  }

}

export default NoteDetailTitle
