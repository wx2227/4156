//@flow
import * as React from 'react';

type Props = {
    url : string
}

class Preview extends React.Component<Props> {
    render() : React.Node {
        const url = "https://docs.google.com/viewer?url=" + this.props.url + "&embedded=true"
        return(
            <iframe title="PDF preview" src={url} style={{height: "80vh", width: "80vh"}}>Preview</iframe>
        )
    }
}

export default Preview;