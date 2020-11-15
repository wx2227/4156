import { BrowserRouter as Router, Switch, Route} from "react-router-dom";
import LoginPage from './containers/googleLogin'
import main from './containers/main'
import NotesView from "./components/NotesListView"
import NoteDetailView from "./components/NoteDetailView";
import Course from "./containers/Course";
import history from './history';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={LoginPage}/>
        <Route path="/main" component={main}/>
        <Route exact path="/course" component={Course}/>
        <Route exact path="/course/:course_number" component={NotesView}/>
        <Route exact path="/note/:noteID" component={NoteDetailView}/>
          <Route exact path="/note" component={NotesView}/>
        {/*<Route exact path="/course" com/>*/}
      </Switch>
    </Router>
  );
}

export default App;