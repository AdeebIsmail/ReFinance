import React, { Component } from "react";
import axios from "axios";

window.$loggedin = "";

window.$userId = "";

export class login extends Component {
  constructor(props) {
    super(props);

    this.onSubmit = this.onSubmit.bind(this);
    this.enterEmail = this.enterEmail.bind(this);
    this.enterPassword = this.enterPassword.bind(this);

    this.state = {
      email: "",
      password: "",
      errorText: "",
    };
    if (
      this.props.location.pathname === "/login" &&
      localStorage.getItem("token") === "user"
    ) {
      window.$loggedin = "";
      window.localStorage.setItem("token", window.$loggedin);

      window.$userId = "";
      window.localStorage.setItem("id", window.$userId);

      window.location.reload(false);
    }
  }

  enterEmail(e) {
    this.setState({
      email: e.target.value,
    });
  }

  enterPassword(e) {
    this.setState({
      password: e.target.value,
    });
  }

  onSubmit(e) {
    e.preventDefault();

    const user = {
      email: this.state.email,
      password: this.state.password,
    };

    this.setState({
      email: "",
      password: "",
      errorText: "",
    });
    axios
      .post("http://10.0.0.247:5000/users/login", user)
      .then((res) => {
        window.location = "/loginhome";
        window.$loggedin = "user";
        window.localStorage.setItem("token", window.$loggedin);

        window.$userId = res.data;
        window.localStorage.setItem("id", window.$userId);
      })
      .catch((err) =>
        this.setState({
          errorText: "There was an error with your email or password",
          email: "",
          password: "",
        })
      );
  }

  render() {
    return (
      <div>
        <style>{"body { background-color: #322F40; }"}</style>
        <h3
          className="text-center"
          style={{
            marginTop: "10%",
            color: "white",
          }}
        >
          User Login
        </h3>
        <form className="col-lg-6 offset-lg-3" onSubmit={this.onSubmit}>
          <div className="form-group">
            <label
              className="col- offset- "
              style={{ marginTop: "1%", color: "white" }}
            >
              Email:
            </label>
            <input
              className="col- offset- form-control"
              onChange={this.enterEmail}
              required
              placeholder="Enter email"
              type="email"
              value={this.state.email}
            />
            <label
              className="col- offset-"
              style={{ marginTop: "1rem", color: "white" }}
            >
              Password:
            </label>
            <input
              className="col- offset- form-control"
              onChange={this.enterPassword}
              required
              placeholder="Enter password"
              type="password"
              value={this.state.password}
            />
            <small style={{ color: "red", marginLeft: "11rem" }}>
              {this.state.errorText}
            </small>
          </div>
          <div className="text-center form-group">
            <input type="submit" value="Login" className="btn btn-primary" />
          </div>
        </form>
      </div>
    );
  }
}

export default login;
