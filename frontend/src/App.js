import React from "react";
import { BrowserRouter as Router, Route} from "react-router-dom";
import BaseRouter from './routes';
import CustomLayout from "./components/CustomLayout";
import LoginPage from "./containers/googleLogin";

function App() {
  return (
      <div>
          <Router>
              <Route extact path="/login" component={LoginPage}/>
              <Route path="/airnote">
                  <CustomLayout>
                      <BaseRouter/>
                  </CustomLayout>
              </Route>
          </Router>
      </div>
  );
}

export default App;
