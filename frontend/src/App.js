import { BrowserRouter as Router, Switch,
  Route} from "react-router-dom";
import LoginPage from './containers/googleLogin'
import main from './containers/main'
import NotePage from "./containers/NotePage"
import NoteDetailPage from "./containers/NoteDetailPage";
import Login from "./containers/Login";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={LoginPage}/>
        <Route path="/main" component={main}/>
        <Route exact path="/note" component={NotePage}/>
        <Route exact path="/note/:noteID" component={NoteDetailPage}/>
          <Route exact path="/login" component={Login}/>
      </Switch>
    </Router>
  );
}

export default App;