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
          <Route exact path="/profile" component={ProfilePage} />
          <Route exact path="/game:gameId" component={GamePage} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={SignUp} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
