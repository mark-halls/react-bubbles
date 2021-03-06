import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Login from "./components/Login";
import PrivateRoute from "./components/PrivateRoute";
import BubblePage from "./components/BubblePage";

import "./styles.scss";

function App() {
  const [appState, setAppState] = useState({
    loggedIn: sessionStorage.getItem("token") ? true : false
  });

  const updateState = valuesObj => {
    setAppState({ ...appState, ...valuesObj });
  };

  return (
    <Router>
      <div className="App">
        <Switch>
          <PrivateRoute isAuthenticated={appState.loggedIn} path="/bubblepage">
            <BubblePage />
          </PrivateRoute>
          <Route
            exact
            path="/Login"
            component={Login}
            updateState={updateState}
          />
          <Route exact path="/" component={Login} updateState={updateState} />
          {/* 
          Build a PrivateRoute component that will 
          display BubblePage when you're authenticated 
        */}
        </Switch>
      </div>
    </Router>
  );
}

export default App;
