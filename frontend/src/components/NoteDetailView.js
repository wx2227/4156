import React from 'react';
import axios from 'axios';
import CommentListView from "./CommentListView";
import './NoteDetailView.css';
import Preview from "./Preview";
import Vote from './Vote.js';
import NoteDetailTitle from "./NoteDetailTitle";

class NoteDetailView extends React.Component {

    state = {
        note: []
    }

    getData() {
        const noteID = this.props.match.params.noteID;
        axios.get(`http://127.0.0.1:8000/api/note/${noteID}`)
            .then(res => {
                this.setState({
                    note: res.data
                })
            })
    }

    async componentDidMount() {
        this.getData()
    }


    handleUpVotes(up_votes) {
        this.setState(prev => ({
            note: prev.item && prev.item.map(item => item['up_votes'] = up_votes)
        }))
    }

    handleDownVotes(down_votes) {
        this.setState(prev => ({
            note: prev.item && prev.item.map(item => item['down_votes'] = down_votes)
        }))
    }

    render() {
        return (
            <div className="row">
                <div className="col-md-2"></div>
                <div className="col-md-8">
                    <div className={"detail-container"}>
                            <NoteDetailTitle note={this.state.note}/>
                            <Preview url={this.state.note.file_url}/>
                        <div style={{width: "100%"}}>
                            <CommentListView comments={this.state.note.comments}/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default NoteDetailView;