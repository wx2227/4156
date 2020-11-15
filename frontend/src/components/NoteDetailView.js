import React from 'react';
import {Button, Card, Form, Statistic} from "antd";
import axios from 'axios';
import {DislikeOutlined, LikeOutlined} from "@ant-design/icons";
import CommentList from "./CommentListView";

class NoteDetailView extends React.Component {
    state = {
        note: []
    }

    componentDidMount() {
        const noteID = this.props.match.params.noteID;
        console.log(noteID);
        axios.get(`http://127.0.0.1:8000/api/note/${noteID}`)
            .then(res => {
                this.setState({
                    note: res.data
                })
            })
    }

    render() {
        return (
            <div>
                <Card name={this.state.note.file_name}>
                    <p>{this.state.note.file_url}</p>
                    <Statistic value={this.state.note.up_votes} prefix={<LikeOutlined />} />,
                    <Statistic value={this.state.note.down_votes} prefix={<DislikeOutlined />} />
                </Card>
                <CommentList comments={this.state.note.comments}/>
            </div>
        );
    }
}

export default NoteDetailView;