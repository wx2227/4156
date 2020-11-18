import React from 'react';
import {Input, Menu} from "antd";
import 'antd/dist/antd.css';
import { withRouter } from "react-router";

const { Search } = Input;

class CustomSearch extends React.Component {
    state = {
        notes: []
    };

    onSearch = (query) => {
        this.props.history.push(`/airnote/notes/${query}`);
    };

    render() {
        return (
            <div>
                <Search
                    placeholder="input search text"
                    allowClear
                    enterButton="Search"
                    size="large"
                    onSearch={this.onSearch}
                />
            </div>
        );
    }
}

export default withRouter(CustomSearch);