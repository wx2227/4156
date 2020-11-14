import { BrowserRouter as Router, Switch,
  Route} from "react-router-dom";
import LoginPage from './containers/googleLogin'
import main from './containers/main'

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={LoginPage}/>
        <Route path="/main" component={main}/>
      </Switch>
    </Router>
  );
}

export default App;