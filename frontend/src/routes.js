import React from "react";
import { Route } from "react-router-dom";

import LoginPage from './containers/googleLogin'
import main from './containers/main'
import NotesView from "./components/NotesListView"
import NoteDetailView from "./components/NoteDetailView";
import Vote from "./components/Vote";

const BaseRouter = () => (
    <div>
        <Route exact path="/" component={LoginPage}/>
        <Route path="/main" component={main}/>
        <Route exact path="/note/:noteID" component={NoteDetailView}/>
        <Route exact path="/note" component={NotesView}/>
        <Route exact path="/vote" component={Vote}/>
    </div>
);

export default BaseRouter;