import * as React from 'react';
import 'antd/dist/antd.css';
import {  PageHeader, Descriptions  } from 'antd';
import Vote from './Vote';
import Cookies from 'js-cookie';
import axios from 'axios';

const Content = ({ children}) => {
  return (
    <div className="content">
      <div className="main">{children}</div>
    </div>
  );
};

class NoteDetailTitle extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            note: [],
            first_name: "",
            last_name: "",
        }
    }

    componentDidUpdate (prevProps) {
        if (this.props.note !== prevProps.note) {
            axios.get(`http://127.0.0.1:8000/api/user/?id=${this.props.note.user_id}`)
                .then( res => {
                    if (res.data.length !== 0) {
                        this.setState({
                            first_name: res.data[0]['user']['first_name'],
                            last_name: res.data[0]['user']['last_name']
                        })
                    }
                }).catch(() => alert("cannot get user info."))
            this.setState({
                note: this.props.note
            })
        }
    }

    renderContent = (column = 3) => (
    <div style={{display: "inline-block"}}>
      <Descriptions size="small" column={column}>
        <Descriptions.Item label="Created">{this.state.last_name} {this.state.first_name}</Descriptions.Item>
        <Descriptions.Item label="Creation Time">{this.props.note.time}</Descriptions.Item>
        <Descriptions.Item label="Course Number">
          {this.props.note.course_number}
        </Descriptions.Item>
        <Descriptions.Item label="Votes">
          <Vote note={this.props.note}/>
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
