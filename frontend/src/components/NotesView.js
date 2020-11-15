import React from 'react';
import axios from 'axios';
import Notes from './Notes';
import 'antd/dist/antd.css';

class NotesView extends React.Component {
    state = {
        notes: []
    }

    componentDidMount() {
        const course_number = this.props.match.params.courseNumber;
        console.log(course_number);
        axios.get(`http://127.0.0.1:8000/api/note?course_number=${course_number}`)
            .then(res => {
                this.setState({
                    notes: res.data
                })
            })
    }

    render() {
        return (
            <div>
                <Notes notes={this.state.notes}/>
            </div>
        );
    }
}

export default NotesView;