import React from "react";
import {useState} from "react";
import { BrowserRouter as Router, Route} from "react-router-dom";
import BaseRouter from './routes';
import CustomLayout from "./components/CustomLayout";
import LoginPage from "./containers/googleLogin";
import Cookies from 'js-cookie';

function App() {

  const [auth, setAuth] = useState(false);

  const checkAuth = () => {
      if (Cookies.get("user") && !auth) {
          setAuth(true);
      }
  }

  return (
      <div>
          <Router>
              <Route exact path="/" component={LoginPage} onLeave={checkAuth()} />
              { auth &&
                <Route path="/airnote">
                    <CustomLayout>
                        <BaseRouter/>
                    </CustomLayout>
                </Route>
              }
          </Router>
      </div>
  );
}

export default App;
