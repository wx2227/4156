import React from "react";
import { Route } from "react-router-dom";

// import NoteList from "./containers/NoteListView";
// import NoteDetail from "./containers/NoteDetailView";
import Login from "./containers/Login";
// import Signup from "./containers/Signup";

const BaseRouter = () => (
    <div>
        {/*<Route exact path='/' component={NoteList} />{" "}*/}
        {/*<Route exact path='/note/:noteID' component={NoteDetail} />{" "}*/}
        <Route exact path='/login/' component={Login} />{" "}
    </div>
);

export default BaseRouter;