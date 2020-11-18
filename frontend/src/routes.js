import React from "react";
import { Route } from "react-router-dom";

import LoginPage from './containers/googleLogin'
import main from './containers/main'
import NotesView from "./components/NotesListView"
import NoteDetailView from "./components/NoteDetailView";
import UploadForm from "./components/UploadForm";
import Layout from "./components/CustomLayout";
import Mainpage from "./containers/MainPage";

const BaseRouter = () => (
    <div>
        <Route exact path="/airnote/main" component={Mainpage}/>
        <Route exact path="/airnote/note/:noteID" component={NoteDetailView}/>
        <Route exact path="/airnote/notes" component={NotesView}/>
        <Route exact path="/airnote/notes/:course_number" component={NotesView}/>
        <Route exact path="/airnote/upload" component={UploadForm}/>
    </div>
);

export default BaseRouter;