import React from 'react';
import axios from 'axios';
import Notes from './Notes';
import 'antd/dist/antd.css';

class NotesListView extends React.Component {

    render() {
        return (
            <Notes notes={this.props.notes}/>
        );
    }
}

export default NotesListView;