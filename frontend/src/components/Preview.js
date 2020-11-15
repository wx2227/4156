import React from 'react';
import {Card} from "antd";

class Preview extends React.Component {
    render() {
        const url = "https://docs.google.com/viewer?url=" + this.props.url + "&embedded=true"
        return(
            <object data={this.props.url} type="application/pdf" style={{height: "80vh", width: "80vh"}}>
                <iframe src={url}></iframe>
            </object>
        )
    }
}

export default Preview;