
import * as React from 'react';
class Preview extends React.Component<Props> {
    render() {
        const url = "https://docs.google.com/viewer?url=" + this.props.url + "&embedded=true"
        return(
            <iframe title="PDF preview" src={url} style={{height: "80vh", width: "80vh"}}>Preview</iframe>
        )
    }
}

export default Preview;