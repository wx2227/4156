import * as React from 'react';
import axios from 'axios';
import './NoteDetailView.css';
import Preview from "./Preview";
import NoteDetailTitle from "./NoteDetailTitle";
import CommentListView from './CommentListView'

class NoteDetailView extends React.Component<props, state> {

    constructor (props) {
        super(props);
        this.state = {
            note: [],
            comments: []
        }
    }

    getData() {
        const noteID = this.props.match.params.noteID;
        axios.get(`http://127.0.0.1:8000/api/note/${noteID}`)
            .then(res => {
                this.setState({
                    note: res.data,
                    comments: res.data['comments']
                })
            })
    }

    componentDidMount() {
        this.getData()
    }

    render()  {
        return (
            <div className="row">
                <div className="col-md-2"> </div>
                <div className="col-md-8">
                    <div className={"detail-container"}>
                    <NoteDetailTitle note={this.state.note}/>
                    <Preview url={this.state.note.file_url}/>
                    <div style={{width: "100%"}}></div>
                        <br/>
                    <a href={this.state.note.file_url}>
                        <button className="btn btn-primary"> Download File </button>
                    </a>
                    <div style={{width: "100%"}}>
                       <CommentListView note={this.state.note}/>
                    </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default NoteDetailView;