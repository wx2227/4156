//@flow
import React from 'react';
import {Card} from "antd";

class Preview extends React.Component {
    render() {
        const url = "https://docs.google.com/viewer?url=" + this.props.url + "&embedded=true"
        return(
            <div style={{width: "100%"}}>
                <iframe src={url} style={{height: "80vh", width: "100%"}}>Preview</iframe>
            </div>
        )
    }
}

export default Preview;