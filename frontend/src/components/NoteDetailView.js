//@flow
import * as React from 'react';
import axios from 'axios';
import './NoteDetailView.css';
import Preview from "./Preview";
import NoteDetailTitle from "./NoteDetailTitle";
 

class NoteDetailView extends React.Component<props, state> {

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

    render()  {
        return (
            <div className="row">
                <div className="col-md-2"> </div>
                <div className="col-md-8">
                    <div className={"detail-container"}>
                        <NoteDetailTitle note={this.state.note}/>
                        <Preview url={this.state.note.file_url}/> <br/>
                        <a href={this.state.note.file_url}>
                            <button className="btn btn-primary"> Download File </button>
                        </a>
                        <div style={{width: "100%"}}>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default NoteDetailView;