import React, { Component } from "react";
import axios from "axios";

window.$loggedin = "";

export class signup extends Component {
  constructor(props) {
    super(props);

    this.onSubmit = this.onSubmit.bind(this);
    this.enterSalary = this.enterSalary.bind(this);
    this.enterPassword = this.enterPassword.bind(this);
    this.confirmPassword = this.confirmPassword.bind(this);
    this.enterEmail = this.enterEmail.bind(this);

    this.state = {
      email: "",
      password: "",
      confirmPassword: "",
      salary: "",
      errorText: "",
    };

    if (
      this.props.location.pathname === "/signup" &&
      localStorage.getItem("token") === "user"
    ) {
      window.$loggedin = "";
      window.localStorage.setItem("token", window.$loggedin);

      window.$userId = "";
      window.localStorage.setItem("id", window.$userId);

      window.location.reload(false);
    }
  }

  enterPassword(e) {
    this.setState({
      password: e.target.value,
    });
  }

  confirmPassword(e) {
    this.setState({
      confirmPassword: e.target.value,
    });
  }
  enterSalary(e) {
    this.setState({
      salary: e.target.value,
    });
  }

  enterEmail(e) {
    this.setState({
      email: e.target.value,
    });
  }

  onSubmit(e) {
    if (this.state.password === this.state.confirmPassword) {
      e.preventDefault();

      const user = {
        email: this.state.email,
        password: this.state.password,
        salary: this.state.salary,
      };

      this.setState({
        password: "",
        confirmPassword: "",
        email: "",
        salary: "",
        errorText: "",
      });
      axios
        .post("http://10.0.0.247:5000/users/add", user)
        .then((res) => {
          window.location = "/loginhome";
          window.$loggedin = "user";
          window.localStorage.setItem("token", window.$loggedin);

          window.$userId = res.data;
          window.localStorage.setItem("id", window.$userId);
        })
        .catch((err) =>
          this.setState({
            errorText: "That email is already taken",
            email: "",
            password: "",
            confirmPassword: "",
            salary: "",
          })
        );
    } else {
      e.preventDefault();
    }
  }
  render() {
    return (
      <div>
        <style>{"body { background-color: #322F40; }"}</style>
        <h3
          className="text-center"
          style={{ marginTop: "10%", color: "white" }}
        >
          User Signup
        </h3>
        <form className="col-lg-6 offset-lg-3" onSubmit={this.onSubmit}>
          <div className="form-group">
            <label
              className="col- offset- "
              style={{ marginTop: "1rem", color: "white" }}
            >
              Email:
            </label>
            <input
              className="col- offset- form-control"
              type="email"
              required
              value={this.state.email}
              onChange={this.enterEmail}
              placeholder="Enter your email"
            />

            <label
              className="col- offset-"
              style={{ marginTop: "1rem", color: "white" }}
            >
              Password:
            </label>
            <input
              className="col- offset- form-control"
              type="text"
              required
              value={this.state.password}
              onChange={this.enterPassword}
              placeholder="Enter your password"
            />
            <label
              className="col- offset-"
              style={{ marginTop: "1rem", color: "white" }}
            >
              Confirm Password:
            </label>
            <input
              className="col- offset- form-control"
              type="text"
              required
              value={this.state.confirmPassword}
              onChange={this.confirmPassword}
              placeholder="Confirm your password"
            />
            <label
              className="col- offset-"
              style={{ marginTop: "1rem", color: "white" }}
            >
              Salary:
            </label>
            <input
              className="col- offset- form-control"
              required
              value={this.state.salary}
              onChange={this.enterSalary}
              placeholder="Enter your salery"
              type="number"
            />
            <small style={{ color: "red", marginLeft: "11rem" }}>
              {this.state.errorText}
            </small>
          </div>
          <div className="text-center form-group">
            <input type="submit" value="Sign up" className="btn btn-primary" />
          </div>
        </form>
      </div>
    );
  }
}

export default signup;
