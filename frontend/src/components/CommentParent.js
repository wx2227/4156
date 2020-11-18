import React from "react";
import CommentListView from "./CommentListView";
import CommentEditor from "./CommentEditor";

class CommentParent extends React.Component {

    // state = {
    //     note: [],
    //     comments: []
    // }
    //
    // getData() {
    //     const noteID = this.props.;
    //     // const noteID = this.props.note_id;
    //     axios.get(`http://127.0.0.1:8000/api/note/${noteID}`)
    //         .then(res => {
    //             this.setState({
    //                 note: res.data,
    //                 comments: res.data['comments']
    //             })
    //         })
    // }
    //
    // componentDidMount() {
    //     this.getData()
    // }

    constructor(props) {
        super(props);
        this.state = {
            note: [],
            comments: [],
            loading: false
        };
        this.addComment = this.addComment.bind(this);

    }

    addComment(comment) {
        this.setState({
            loading: false,
            note: this.state.note,
            comments: [comment, ...this.state.comments]
        });
    }

    render() {
        return (
            <>
                <CommentListView
                    comments={this.state.comments}
                />
                <CommentEditor
                    loading={this.state.loading}
                    note={this.state.note}
                    addComment={this.addComment}
                />
            </>
        );
    }
}

export default CommentParent;