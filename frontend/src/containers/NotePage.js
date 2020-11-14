import React from 'react';
import { Input } from 'antd';
import axios from 'axios';
import Note from '../components/Note';
import 'antd/dist/antd.css';


const { Search } = Input;

class NotePage extends React.Component {
    state = {
        notes: []
    }

    render() {
        const onSearch = value => {
            axios.get(`http://127.0.0.1:8000/api/note/?course_number=${value}`)
                .then(res => {
                    this.setState({
                        notes: res.data
                    });
                })
        }

        return (
            <div>
                <Search
                    placeholder="input search course number to search notes"
                    allowClear
                    enterButton="Search"
                    size="large"
                    onSearch={onSearch}
                />
                <Note notes={this.state.notes}/>
            </div>
        );
    }
}

export default NotePage;