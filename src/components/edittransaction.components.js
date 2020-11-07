import React, { Component } from "react";
import axios from "axios";

let parsedResponse = [];

class deletetransaction extends Component {
  constructor(props) {
    super(props);

    this.onSubmit = this.onSubmit.bind(this);
    this.enterFee = this.enterFee.bind(this);
    this.enterCategory = this.enterCategory.bind(this);
    this.enterDate = this.enterDate.bind(this);
    this.enterInfo = this.enterInfo.bind(this);

    this.state = {
      isLoading: true,
      fee: this.props.fee,
      category: this.props.category,
      date: this.props.date,
      info: this.props.info,
      id: this.props.id,
    };
  }

  onSubmit(e) {
    e.preventDefault();

    const transaction = {
      id: this.state.id,
      fee: this.state.fee,
      date: this.state.date,
      info: this.state.info,
      category: this.state.category,
    };
    console.log(transaction);

    this.setState({
      isLoading: true,
      fee: "",
      date: "",
      info: "",
      id: this.props.id,
    });

    if (this.state.category !== " ") {
      axios
        .post(
          "http://10.0.0.247:5000/users/transaction/update/" +
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
        fee: "",
        date: "",
        info: "",
        id: this.props.id,
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
              Edit amount spent
            </label>
            <input
              className="col- offset- form-control"
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
              Edit selected category
            </label>

            <select
              className=" col- offset- form-control "
              onChange={this.enterCategory}
              defaultValue={this.state.category}
            >
              <option disabled hidden value={this.state.category}>
                {this.state.category}
              </option>
              {parsedResponse
                .slice(0)
                .reverse()
                .map((parsedResponse) => {
                  return (
                    <option
                      className="list-group-item list-group-item-info"
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
              Edit date selected
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
              Edit info
            </label>
            <input
              className="col- offset- form-control"
              type="text"
              style={{ marginTop: "2rem" }}
              onChange={this.enterInfo}
              value={this.state.info}
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

export default deletetransaction;
