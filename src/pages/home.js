import React, { Component } from "react";
import Typical from "react-typical";
import Background from "./84248.png";

export class home extends Component {
  constructor(props) {
    super(props);
    if (
      this.props.location.pathname === "/" &&
      localStorage.getItem("token") === "user"
    ) {
      window.$loggedin = "";
      window.localStorage.setItem("token", window.$loggedin);
      window.location.reload(false);
    }
  }

  render() {
    return (
      <div
        className=""
        style={{
          backgroundImage: `url(${Background})`,
          height: "100vh",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        <div
          className="col- offset-"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: "6vmin",
            color: "white",
          }}
        >
          Welcome to ReFinance!
        </div>
        <div
          className="col- offset-"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "3rem",
            fontSize: "6vmin",
            color: "white",
          }}
        >
          <Typical
            loop={Infinity}
            wrapper="b"
            steps={[
              "A new way to finance...",
              2000,
              "A new way to save...",
              2000,
              "A new way to grow...",
              2000,
            ]}
          />
        </div>
        <div
          className="col offset-"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "3rem",
            fontSize: "4vmin",
          }}
        >
          <a href="/login" className="btn btn-primary">
            Login!
          </a>
          <a
            href="/signup"
            className="btn btn-primary"
            style={{
              marginLeft: "1rem",
            }}
          >
            Sign Up!
          </a>
        </div>
        <div
          className="col offset-"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "3rem",
            fontSize: "3vmin",
            color: "white",
          }}
        >
          Learn how to correctly finance by setting out a proper budget!
        </div>
        <div
          className="col- offset-"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "3rem",
            fontSize: "3vmin",
            color: "white",
          }}
        >
          Create savings, budgets and more!
        </div>
        <div
          className="col offset-"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "3rem",
            fontSize: "3vmin",
            color: "white",
          }}
        >
          View the amount of money you spend per day, month, and week!
        </div>
      </div>
    );
  }
}

export default home;
