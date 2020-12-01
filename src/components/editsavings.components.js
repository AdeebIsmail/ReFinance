import React, { Component } from "react";
import axios from "axios";

class editsaving extends Component {
  constructor(props) {
    super(props);

    this.onSubmit = this.onSubmit.bind(this);
    this.enterSaving = this.enterSaving.bind(this);
    this.enterAmount = this.enterAmount.bind(this);
    this.enterGoal = this.enterGoal.bind(this);

    this.state = {
      isLoading: true,
      amount: this.props.amount,
      goal: this.props.goal,
      saving: this.props.saving,
      id: this.props.id,
      prevAmount: this.props.amount,
    };
  }

  onSubmit(e) {
    e.preventDefault();

    console.log(this.state.amount);
    console.log(this.state.prevAmount);

    const transaction = {
      id: this.state.id,
      goal: this.state.goal,
      amount: +this.state.amount + +this.state.prevAmount,
      saving: this.state.saving,
    };

    this.setState({
      isLoading: true,
      goal: "",
      amount: "",
      saving: "",
      id: this.props.id,
    });
    if (this.state.saving !== " " && this.state.goal !== " ") {
      axios
        .post(
          "http://10.0.0.247:5000/users/savings/update/" +
            window.localStorage.getItem("id"),
          transaction
        )
        .then((res) => {
          window.location.reload(false);
        })
        .catch((err) => console.log(err));
      window.location.reload(false);
    } else {
      this.setState({
        goal: "",
        amount: "",
        saving: "",
        id: this.props.id,
      });
    }
  }

  enterSaving(e) {
    this.setState({
      saving: e.target.value,
    });
  }

  enterAmount(e) {
    this.setState({
      amount: e.target.value,
    });
  }

  enterGoal(e) {
    this.setState({
      goal: e.target.value,
    });
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
                fontSize: "4vmin",
                color: "white",
              }}
            >
              Edit what you are saving for
            </label>
            <input
              className="col- offset- form-control"
              style={{ marginTop: "2rem" }}
              onChange={this.enterSaving}
              type="text"
              value={this.state.saving}
              required
            ></input>
            <label
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginTop: "2rem",
                fontSize: "4vmin",
                color: "white",
              }}
            >
              Edit your goal
            </label>

            <input
              className="col- offset- form-control"
              style={{ marginTop: "2rem" }}
              onChange={this.enterGoal}
              type="number"
              value={this.state.goal}
              required
            ></input>

            <label
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginTop: "2rem",
                fontSize: "4vmin",
                color: "white",
              }}
            >
              Add to your goal
            </label>
            <input
              className="col- offset- form-control"
              style={{ marginTop: "2rem" }}
              onChange={this.enterAmount}
              type="number"
              value={this.state.amount}
            ></input>
          </div>
          <div className="text-center form-group">
            <input type="submit" value="Submit" className="btn btn-primary" />
          </div>
        </form>
      </div>
    );
  }
}

export default editsaving;
