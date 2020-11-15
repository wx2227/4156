import React from 'react';
import axios from 'axios';
import Notes from './Notes';
import 'antd/dist/antd.css';

class NotesListView extends React.Component {
    state = {
        notes: []
    }

    componentDidMount() {
        const course_number = this.props.course_number;
        if (course_number === undefined) {
            axios.get(`http://127.0.0.1:8000/api/note/`)
                .then(res =>
                    this.setState({
                        notes: res.data
                    })
                )
        } else {
            axios.get(`http://127.0.0.1:8000/api/note?course_number=${course_number}`)
                .then(res => {
                    this.setState({
                        notes: res.data
                    })
                })
        }
    }



    render() {
        return (
            <Notes notes={this.state.notes}/>
        );
    }
}

export default NotesListView;