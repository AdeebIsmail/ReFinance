import React, { Component } from "react";
import img from "./logo.png";

export default class loggedinnavbar extends Component {
  render() {
    return (
      <div>
        <nav
          className="navbar navbar-expand-lg navbar-light  "
          style={{
            backgroundColor: "#655d91",
            position: "relative",
            right: "0",
            left: "0",
          }}
        >
          <a
            className="navbar-brand text-center"
            href="/loginhome"
            style={{ marginBottom: "1px" }}
          >
            <img
              src={img}
              style={{ height: "20px", width: "20px", marginBottom: "5px" }}
              alt=""
            />
            ‏‏‎ ‎ReFinance
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <a className="nav-link" href="/categories">
                  Categories
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/transaction">
                  New Transaction
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/transactionhistory">
                  Transaction History
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/savings">
                  Savings
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}
