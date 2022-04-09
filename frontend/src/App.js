import React, { useEffect } from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";

import GamePage from "./Components/GamePage";
import HomePage from "./Components/HomePage";
import Login from "./Components/Login";
import NavBar from "./Components/NavBar";
import ProfilePage from "./Components/ProfilePage";
import SignUp from "./Components/SignUp";

function App() {
  return (
    <Router>
      <div className="flex flex-col">
        <NavBar />
        <Switch> 
          <Route exact path="/" component={HomePage} />
          <Route exact path="/profile" component={ProfilePage} />
          <Route exact path="/game/:gid" component={GamePage} />
          <Route exact path="/login" component={Login} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
