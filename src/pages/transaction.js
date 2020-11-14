import React, { Component } from "react";
import axios from "axios";

let parsedResponse = [];

export class transaction extends Component {
  constructor(props) {
    super(props);

    this.onSubmit = this.onSubmit.bind(this);
    this.enterFee = this.enterFee.bind(this);
    this.enterCategory = this.enterCategory.bind(this);
    this.enterDate = this.enterDate.bind(this);
    this.enterInfo = this.enterInfo.bind(this);

    this.state = {
      isLoading: true,
      fee: "",
      category: "",
      date: "",
      info: "",
      text: "",
    };
  }

  onSubmit(e) {
    e.preventDefault();

    const transaction = {
      fee: this.state.fee,
      date: this.state.date,
      info: this.state.info,
      category: this.state.category,
    };

    this.setState({
      isLoading: true,
      fee: "",
      date: "",
      info: "",
    });

    if (this.state.category !== "") {
      axios
        .post(
          "http://10.0.0.247:5000/users/transaction/" +
            window.localStorage.getItem("id"),
          transaction
        )
        .then(() => {
          window.location.reload(false);
        })
        .catch((err) => console.log(err));

      this.setState({ text: "Added new transaction" });
    } else {
      this.setState({
        text: "Please select a category",
        fee: "",
        date: "",
        info: "",
      });
    }
  }

  enterFee(e) {
    this.setState({
      fee: e.target.value,
    });
  }

  enterCategory(e) {
    this.setState({
      category: e.target.value,
    });
  }

  enterDate(e) {
    this.setState({
      date: e.target.value,
    });
  }

  enterInfo(e) {
    this.setState({
      info: e.target.value,
    });
  }

  componentDidMount() {
    axios
      .get(
        "http://10.0.0.247:5000/users/category/get/" +
          window.localStorage.getItem("id")
      )
      .then((res) => {
        parsedResponse = JSON.parse(JSON.stringify(res.data));

        this.setState({ isLoading: false });
      })
      .catch();
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
              How much did you spend?
            </label>
            <input
              className="col- offset- form-control"
              required
              style={{ marginTop: "2rem" }}
              onChange={this.enterFee}
              type="number"
              value={this.state.fee}
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
              Select your category
            </label>

            <select
              className=" col- offset- form-control "
              onChange={this.enterCategory}
              defaultValue={this.state.category}
            >
              <option disabled hidden value={this.state.category}>
                Choose your category!
              </option>
              {parsedResponse
                .slice(0)
                .reverse()
                .map((parsedResponse) => {
                  return (
                    <option
                      className="list-group-item list-group-item-dark"
                      style={{
                        textAlign: "center",
                      }}
                    >
                      {parsedResponse}
                    </option>
                  );
                })}
            </select>

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
              Enter the date
            </label>
            <input
              className="col- offset- form-control"
              style={{ marginTop: "2rem" }}
              onChange={this.enterDate}
              type="date"
              value={this.state.date}
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
              Extra Info
            </label>
            <input
              className="col- offset- form-control"
              type="text"
              style={{ marginTop: "2rem" }}
              onChange={this.enterInfo}
              value={this.state.info}
            ></input>
            <small
              style={{
                color: "green",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {this.state.text}
            </small>
          </div>
          <div className="text-center form-group">
            <input type="submit" value="Submit" className="btn btn-primary" />
          </div>
        </form>
      </div>
    );
  }
}

export default transaction;
