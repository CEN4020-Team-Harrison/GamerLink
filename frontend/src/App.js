import { Route, BrowserRouter as Router, Switch } from "react-router-dom";

import GamePage from "./Components/GamePage";
import HomePage from "./Components/HomePage";
import Login from "./Components/Login";
import NavBar from "./Components/NavBar";
import ProfilePage from "./Components/ProfilePage";
import React from "react";
import SignUp from "./Components/SignUp";

function App() {
  return (
    <Router>
      <div className="flex flex-col">
        <NavBar />
        <Switch> 
          <Route exact path="/" component={HomePage} />
          <Route path="/profile" component={ProfilePage} />
          <Route path="/game" component={GamePage} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={SignUp} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
