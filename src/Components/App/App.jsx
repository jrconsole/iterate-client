import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import './App.css';
import Splash from '../Splash/Splash';
//import NavBar from '../NavBar/NavBar';

function App() {
  return (
    <>
      <Router>
        <div>
          {/*<NavBar />*/}

          <Switch>
            <Route exact path="/">
              <Splash />
            </Route>
          </Switch>
        </div>
      </Router>
    </>
  );
}

export default App;
