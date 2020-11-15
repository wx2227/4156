import { BrowserRouter as Router, Switch, Route} from "react-router-dom";
import LoginPage from './containers/googleLogin'
import main from './containers/main'
import NotesView from "./components/NotesView"
import NoteDetailView from "./components/NoteDetailView";
import history from './history';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={LoginPage}/>
        <Route path="/main" component={main}/>
        {/*<Route exact path="/course/:courseNumber" component={NotesView}/>*/}
        <Route exact path="/note/:noteID" component={NoteDetailView}/>
        {/*<Route exact path="/course" com/>*/}
      </Switch>
    </Router>
  );
}

export default App;