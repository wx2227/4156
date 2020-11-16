import React from 'react';
import {Card} from "antd";

class Preview extends React.Component {
    render() {
        const url = "https://docs.google.com/viewer?url=" + this.props.url + "&embedded=true"
        return(
            <iframe src={url} style={{height: "80vh", width: "80vh"}}>Preview</iframe>
        )
    }
}

export default Preview;