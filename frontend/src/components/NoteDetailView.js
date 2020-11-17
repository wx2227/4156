//@flow
import * as React from 'react';
import axios from 'axios';
import CommentListView from "./CommentListView";
import './NoteDetailView.css';
import Preview from "./Preview";
import Vote from './Vote.js';
import NoteDetailTitle from "./NoteDetailTitle";

type params = {
    noteID : string 
}
type match = {
    params : params  
}
type Props = {
    match : match
}
type State = {
    note : any, 
    item? : ?{[string] : number}
}

class NoteDetailView extends React.Component<Props, State> {

    state : State = {
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


    handleUpVotes(up_votes : number) : void {
        this.setState(prev => ({
            note: prev.item && prev.item.map(item => item['up_votes'] = up_votes)
        }))
    }

    handleDownVotes(down_votes : number) : void {
        this.setState(prev => ({
            note: prev.item && prev.item.map(item => item['down_votes'] = down_votes)
        }))
    }

    render() : React.Node {
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