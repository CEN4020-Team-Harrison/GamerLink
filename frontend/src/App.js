import React, { useEffect, useState } from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";

import GamePage from "./Components/GamePage";
import HomePage from "./Components/HomePage";
import Login from "./Components/Login";
import NavBar from "./Components/NavBar";
import ProfilePage from "./Components/ProfilePage";
import { getStorageValue } from "./utils";
import { userContext } from "./Components/userContext";

function App() {
  const [user, setUser] = useState();

  useEffect(() => {
    setUser(getStorageValue("loginData"));
    console.log(user);
  }, []);

  return (
    <Router>
      <userContext.Provider value={{ user, setUser }}>
        <div className="flex flex-col">
          <NavBar />
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/profile/:email" component={ProfilePage} />
            <Route exact path="/game/:gid" component={GamePage} />
            <Route exact path="/login" component={Login} />
          </Switch>
        </div>
      </userContext.Provider>
    </Router>
  );
}

export default App;
