import React from 'react'
import axios from 'axios'

import Notes from './Note'
import CustomForm from "../components/Form";


class NoteList extends React.Component {
    state = {
        notes: []
    }

    componentDidMount() {
        axios.get('http://127.0.0.1:8000/api/note/')
            .then(res => {
                this.setState({
                    notes: res.data
                });
            })
    }

    render() {
        return (
            <div>
                <Notes notes={this.state.notes}/>
                <br />
                <h2>Create a note</h2>
                <CustomForm requestType={"post"} noteID={null} btnText="Create" />
            </div>

        )
    }
}

export default NoteList;