import React, { Component } from "react";
import axios from "axios";

import EditTransaction from "../components/edittransaction.components";

let parsedResponse = [];
let list = [];

export class transactionhistory extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      edit: false,
      id: "",
      fee: "",
      category: "",
      date: "",
      info: "",
    };
  }

  componentDidMount() {
    axios
      .get(
        "http://10.0.0.247:5000/users/transaction/get/" +
          window.localStorage.getItem("id")
      )
      .then((res) => {
        parsedResponse = JSON.parse(JSON.stringify(res.data));
        parsedResponse
          .slice(0)
          .reverse()
          .map((parsedResponse) => {
            list.push(parsedResponse._id);
          });

        this.setState({ isLoading: false });
      })
      .catch();
  }
  edit(toEdit, id, fee, category, date, info) {
    this.setState({
      edit: toEdit,
      id: id,
      fee: fee,
      category: category,
      date: date,
      info: info,
    });
  }

  delete(objectId) {
    const id = {
      id: objectId,
    };
    axios
      .post(
        "http://10.0.0.247:5000/users/transaction/delete/" +
          window.localStorage.getItem("id"),
        id
      )
      .then((res) => {
        window.location.reload(false);
      });
  }
  render() {
    if (this.state.edit === true) {
      return (
        <div>
          {" "}
          <EditTransaction
            id={this.state.id}
            fee={this.state.fee}
            date={this.state.date}
            category={this.state.category}
            info={this.state.info}
          />
        </div>
      );
    } else if (this.state.isLoading || list.length === 0) {
      return (
        <div>
          <style>{"body { background-color: #322F40; }"}</style>
          <label
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginTop: "1%",
              fontSize: "4vmin",
              color: "white",
            }}
          >
            Add a new transaction
          </label>
        </div>
      );
    } else {
      return (
        <div>
          <div>
            <label
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginTop: "1%",
                fontSize: "4vmin",
                color: "white",
              }}
            >
              Transaction History
            </label>
          </div>
          <style>{"body { background-color: #322F40; }"}</style>
          <div className="container ">
            <div className="row ">
              {parsedResponse
                .slice(0)
                .reverse()
                .map((parsedResponse) => {
                  return (
                    <div className="col-sm-4 " style={{ marginTop: "2%" }}>
                      <div className="card text-black bg-secondary mb-3">
                        <div className="card-header">
                          {"Date: " + parsedResponse.date}
                        </div>
                        <div className="card-body">
                          <h5 className="card-title">
                            {parsedResponse.fee + " dollars were spent"}
                          </h5>
                          <p className="card-text">
                            {"Category: " + parsedResponse.category}
                          </p>
                          <p className="card-text">
                            {"Extra Info: " + parsedResponse.info}{" "}
                          </p>
                          <input
                            type="button"
                            className="btn btn-primary"
                            value="Delete"
                            onClick={this.delete.bind(this, parsedResponse._id)}
                          />
                          <input
                            type="button"
                            className="btn btn-primary"
                            value="Edit"
                            style={{ marginLeft: "1%" }}
                            onClick={this.edit.bind(
                              this,
                              true,
                              parsedResponse._id,
                              parsedResponse.fee,
                              parsedResponse.category,
                              parsedResponse.date,
                              parsedResponse.info
                            )}
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      );
    }
  }
}

export default transactionhistory;
