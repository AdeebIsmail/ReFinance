import React, { Component } from "react";
import axios from "axios";

let parsedResponse = [];
let list = [];

export default class savingcards extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
    };
  }

  componentDidMount() {
    axios
      .get(
        "http://10.0.0.247:5000/users/savings/get/" +
          window.localStorage.getItem("id")
      )
      .then((res) => {
        parsedResponse = JSON.parse(JSON.stringify(res.data));
        parsedResponse
          .slice(0)
          .reverse()
          .map((parsedResponse) => {
            list.push(parsedResponse);
          });

        this.setState({ isLoading: false });
      })
      .catch((err) => console.log(err));
  }

  delete(objectId) {
    const id = {
      id: objectId,
    };
    axios
      .post(
        "http://10.0.0.247:5000/users/savings/delete/" +
          window.localStorage.getItem("id"),
        id
      )
      .then((res) => {
        window.location.reload(false);
      });
  }

  render() {
    if (this.state.isLoading === false || list.length !== 0) {
      return (
        <div>
          <div className="container " style={{ marginTop: "1rem" }}>
            <div className="row ">
              {parsedResponse
                .slice(0)
                .reverse()
                .map((parsedResponse) => {
                  return (
                    <div className="col-sm-6 ">
                      <div className="card text-black bg-secondary mb-3 ">
                        <div className="card-header">
                          {"Saving: " + parsedResponse.saving}
                        </div>
                        <div className="card-body">
                          <h5 className="card-title">
                            {"Goal: " + parsedResponse.goal + " dollars"}
                          </h5>
                          <div class="progress">
                            <div
                              class="progress-bar progress-bar-striped bg-info progress-bar-animated"
                              role="progressbar"
                              aria-valuenow="70"
                              aria-valuemin="0"
                              aria-valuemax="100"
                              style={{ width: "50%" }}
                            ></div>
                          </div>
                          <h5
                            className="card-title"
                            style={{ marginTop: "1rem" }}
                          >
                            Enter Amount:
                          </h5>

                          <input
                            className="btn btn-primary"
                            type="button"
                            style={{ marginTop: "2%", marginRight: "1%" }}
                            value="Delete"
                            onClick={this.delete.bind(this, parsedResponse._id)}
                          />
                          <input
                            className="btn btn-primary"
                            type="button"
                            style={{ marginTop: "2%", marginRight: "1%" }}
                            value="Edit"
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
    } else {
      return <div></div>;
    }
  }
}
