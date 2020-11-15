import React from 'react';
import axios from 'axios';
import CommentListView from "./CommentListView";
import './NoteDetailView.css';
import Preview from "./Preview";

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
            <div className={"bdp_body_container"}>
                <div>
                    <div className={"title_container"}>
                        <h1>{this.state.note.file_name}</h1>
                    </div>
                    <ul>
                        <li>
                            <label>Course Number   </label>
                            <span>
                                <span>{this.state.note.course_number}</span>
                            </span>
                        </li>
                    </ul>
                    <label>{this.state.note.description}</label>
                </div>
                <Preview />
                <CommentListView comments={this.state.note.comments}/>
            </div>
        );
    }
}

export default NoteDetailView;