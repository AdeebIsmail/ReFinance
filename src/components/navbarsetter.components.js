import React, { Component } from "react";
import Navbar from "./navbar.components";
import LoginNav from "./loggedinnavbar.components";

class navbarsetter extends Component {
  render() {
    let loggedin = false;

    if (localStorage.getItem("token") === "user") {
      loggedin = true;
    }

    return loggedin ? <LoginNav /> : <Navbar />;
  }
}

export default navbarsetter;
