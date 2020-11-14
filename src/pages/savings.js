import React, { Component } from "react";
import axios from "axios";
import Savings from "../components/savingcards.components";

export class savings extends Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.enterSaving = this.enterSaving.bind(this);
    this.enterGoal = this.enterGoal.bind(this);

    this.state = {
      saving: "",
      goal: 0,
    };
  }

  enterSaving(e) {
    this.setState({
      saving: e.target.value,
    });
  }
  enterGoal(e) {
    this.setState({
      goal: e.target.value,
    });
  }

  onSubmit(e) {
    e.preventDefault();

    const saving = {
      saving: this.state.saving,
      goal: this.state.goal,
    };

    this.setState({
      saving: "",
      goal: 0,
    });
    console.log(window.localStorage.getItem("id"));
    axios
      .post(
        "http://10.0.0.247:5000/users/savings/" +
          window.localStorage.getItem("id"),
        saving
      )
      .then(() => {
        window.location.reload(false);
      })
      .catch((err) =>
        this.setState({
          saving: "",
          goal: 0,
        })
      );
  }

  render() {
    return (
      <div>
        <style>{"body { background-color: #322F40; }"}</style>
        <form onSubmit={this.onSubmit} className="col-lg-6 offset-lg-3">
          <div className="form-group">
            <label
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginTop: "10%",
                fontSize: "5vmin",
                color: "white",
              }}
            >
              What are you saving up for?
            </label>
            <input
              className="col- offset- form-control"
              type="text"
              required
              style={{ marginTop: "3rem" }}
              onChange={this.enterSaving}
              value={this.state.saving}
            />
            <label
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginTop: "5%",
                fontSize: "5vmin",
                color: "white",
              }}
            >
              What is the goal amount?
            </label>
            <input
              className="col- offset- form-control"
              type="number"
              required
              style={{ marginTop: "3rem" }}
              onChange={this.enterGoal}
              value={this.state.goal}
            />
          </div>
          <div className="text-center form-group ">
            <input
              type="submit"
              value="Submit"
              className="btn btn-primary"
              style={{ alignItems: "center" }}
            />
          </div>
        </form>
        <div>
          <h1
            className="text-center "
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginTop: "1rem",
              fontSize: 19,
              color: "white",
            }}
          >
            Savings
          </h1>
        </div>
        <div className="col- offset-">
          <Savings />
        </div>
      </div>
    );
  }
}
export default savings;
