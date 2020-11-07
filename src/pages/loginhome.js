import React, { Component } from "react";
import FadeInAnimation from "../components/fadein.components";

export class loginpage extends Component {
  constructor(props) {
    super(props);

    this.logout = this.logout.bind(this);
  }
  logout() {
    window.$userToken = "";
    window.localStorage.setItem("token", window.$loggedin);

    window.$userId = "";
    window.localStorage.setItem("id", window.$userId);

    window.location = "/";
  }

  render() {
    return (
      <FadeInAnimation>
        <style>{"body { background-color: #322F40; }"}</style>
        <div
          className="text-center "
          style={{ marginTop: "1rem", color: "white", fontSize: "4vmin" }}
        >
          Welcome, you are logged in!
          <div>
            <input
              type="button"
              className="btn btn-primary "
              style={{ marginTop: "1rem" }}
              onClick={this.logout}
              value="Sign out"
            />
          </div>
        </div>
      </FadeInAnimation>
    );
  }
}

export default loginpage;
