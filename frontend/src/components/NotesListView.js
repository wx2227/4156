//@flow
import React from 'react';
import axios from 'axios';
import Notes from './Notes';
import 'antd/dist/antd.css';

class NotesListView extends React.Component {

    render() {
        return (
            <div className="row d-flex justify-content-center">
                <div className="col-md-12" align="center">
                    <Notes notes={this.props.notes}/>
                </div>
            </div>
        );
    }
}

export default NotesListView;