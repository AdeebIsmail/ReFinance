import React from "react";
import { Redirect } from "react-router-dom";
import { Component } from "react";

class ProtectedRoute extends Component {
  render() {
    const Component = this.props.component;
    const isAuthenticated = localStorage.getItem("token") === "user";

    return isAuthenticated ? (
      <Component />
    ) : (
      <Redirect to={{ pathname: "/login" }} />
    );
  }
}

export default ProtectedRoute;
