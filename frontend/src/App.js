import { BrowserRouter as Router, Switch, Route} from "react-router-dom";
import LoginPage from './containers/googleLogin'
import main from './containers/main'
import NotesView from "./components/NotesListView"
import NoteDetailView from "./components/NoteDetailView";
import Vote from "./components/Vote";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={LoginPage}/>
        <Route path="/main" component={main}/>
        <Route exact path="/note/:noteID" component={NoteDetailView}/>
        <Route exact path="/note" component={NotesView}/>
      </Switch>
    </Router>
  );
}

export default App;