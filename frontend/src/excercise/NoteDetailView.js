import React from 'react'
import axios from 'axios'
import 'antd/dist/antd.css';

import {Card, Button, Form, Statistic} from 'antd'


import CustomForm from "../components/Form";

class NoteDetail extends React.Component {
    state = {
        note: {}
    }

    componentDidMount() {
        const noteID = this.props.match.params.noteID;
        axios.get(`http://127.0.0.1:8000/api/note/${noteID}`)
            .then(res => {
                this.setState({
                    note: res.data
                });
            });
    }

    handleDelete = (event) => {
        const noteID = this.props.match.params.noteID;
        axios.delete(`http://127.0.0.1:8000/api/note/${noteID}`)
            .then(_ => {
                this.props.history.push(`/`);
            })
    }

    render() {
        return (
            <div>
                <Card name={this.state.note.file_name}>
                    <p>{this.state.note.file_url}</p>
                    <p>{this.state.note.up_votes}</p>
                    <p>{this.state.note.down_votes}</p>
                </Card>
                <CustomForm
                    requestType="put"
                    noteID={this.props.match.params.noteID}
                    btnText="Update"/>
                <Form onFinish={this.handleDelete}>
                    <Button type={"danger"} htmlType={"submit"}>Delete</Button>
                </Form>
            </div>
        )
    }
}

export default NoteDetail;