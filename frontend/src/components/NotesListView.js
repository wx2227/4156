
import * as React from 'react';
import axios from 'axios';
import Notes from './Notes';
import 'antd/dist/antd.css';


class NotesListView extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            notes: [],
            course: []
        }
    }

    componentDidMount() {
        const course_number = this.props.match.params.course_number;
        if (course_number === undefined) {
            axios.get("http://localhost:8000/api/note/")
                .then(res => {
                    this.setState({
                        notes: res.data
                    })
                }).catch(() => {
                    alert("Cannot get note form server")
                }
            )
        } else {
            axios.get(`http://localhost:8000/api/note/?course_number=${course_number}`)
                .then(res => {
                    this.setState({
                        notes: res.data
                    })
                }).catch(() => {
                    alert("Please input a valid course number.")
                }
            )
        }
        axios.get(`http://localhost:8000/api/course/?course_number=${course_number}`)
          .then(res => {
              this.setState({
                  course: res.data
              })
          }).catch(() => {
            alert("Cannot get course form server")
        })
    }

    render() {
        return (
            <div className="row justify-content-center">
                <div className="col-md-12" align="center">
                    <Notes notes={this.state.notes} course={this.state.course}/>
                </div>
            </div>
        );
    }
}

export default NotesListView;