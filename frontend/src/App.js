import React from "react";
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";
import LoginPage from './containers/googleLogin'
import main from './containers/main'
import NotesView from "./components/NotesListView"
import NoteDetailView from "./components/NoteDetailView";
<<<<<<< HEAD
import CommentParent from "./components/CommentParent";
=======
import UploadForm from "./components/UploadForm"
>>>>>>> 1b835907303d2788907a461aa9859bfe0d0e3069

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={LoginPage}/>
        <Route path="/main" component={main}/>
        <Route exact path="/note/:noteID" component={NoteDetailView}/>
        <Route exact path="/note" component={NotesView}/>
        <Route exact path="/upload" component={UploadForm}/>
      </Switch>
    </Router>
  );
}

export default App;
