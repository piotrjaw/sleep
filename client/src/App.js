import React, { useContext, Fragment } from "react";
import "./App.css";

// components

import InputSleep from "./components/InputSleep";
import ListSleep from "./components/ListSleep";
import SignIn from "./components/SignIn";
import LogOut from "./components/LogOut";

import { UserContext } from "./components/UserContext";

function App() {
  const user = useContext(UserContext);

  return (
    <Fragment>
      <div className="container">
        {user?.loggedIn === null ? (
          ""
        ) : user?.loggedIn === true ? (
          <div className="flex text-center text-light">
            <div>
              <p className="pt-5">Welcome, {user.username}</p>
              <LogOut />
            </div>
            <InputSleep />
            <ListSleep />
          </div>
        ) : (
          <SignIn />
        )}
      </div>
    </Fragment>
  );
}

export default App;
