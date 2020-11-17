//@flow
import * as React from 'react';
import axios from 'axios';
import Notes from './Notes';
import 'antd/dist/antd.css';

type comments = {
    id: number,
    content: string,
    time: any,
    user_id: number,
    note_id: number
}

type notes = {
    id : number,
    user_id : number,
    course_number : string,
    file_name: string,
    file_url: string,
    description: string,
    comments: comments
}

type Props = {
    notes: notes
}

// $FlowFixMe
class NotesListView extends React.Component<Props>{

    render() : React.Node {
        // $FlowFixMe
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