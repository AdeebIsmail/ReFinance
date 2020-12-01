import React, { Component } from "react";
import axios from "axios";
import EditSavings from "../components/editsavings.components";

let parsedResponse = [];
let list = [];

export class savings extends Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.enterSaving = this.enterSaving.bind(this);
    this.enterGoal = this.enterGoal.bind(this);

    this.state = {
      saving: "",
      goal: 0,
      amount: 0,
      edit: false,
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

  edit(toEdit, id, saving, goal, amount) {
    this.setState({
      edit: toEdit,
      id: id,
      saving: saving,
      goal: goal,
      amount: amount,
    });
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
      amount: 0,
    };

    this.setState({
      saving: "",
      goal: 0,
      amount: 0,
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
      .catch((err) => console.log(err));
  }

  render() {
    if (this.state.edit === true) {
      return (
        <div>
          {" "}
          <EditSavings
            id={this.state.id}
            goal={this.state.goal}
            amount={this.state.amount}
            saving={this.state.saving}
          />
        </div>
      );
    } else {
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
            <div className="container " style={{ marginTop: "1rem" }}>
              <div className="row ">
                {parsedResponse
                  .slice(0)
                  .reverse()
                  .map((parsedResponse) => {
                    let completed = parsedResponse.goal + " dollars";
                    if (+parsedResponse.goal <= +parsedResponse.amount) {
                      completed = "Completed!";
                    }

                    return (
                      <div className="col-sm-6 ">
                        <div className="card text-black bg-secondary mb-3 ">
                          <div className="card-header">
                            {"Saving: " + parsedResponse.saving}
                          </div>
                          <div className="card-body">
                            <h5 className="card-title">
                              {"Goal: " + completed + ""}
                            </h5>
                            <div class="progress">
                              <div
                                class="progress-bar progress-bar-striped bg-info progress-bar-animated"
                                role="progressbar"
                                aria-valuenow="70"
                                aria-valuemin="0"
                                aria-valuemax="100"
                                style={{
                                  width:
                                    (
                                      (parsedResponse.amount /
                                        parsedResponse.goal) *
                                      100
                                    ).toFixed(2) + "%",
                                }}
                              ></div>
                            </div>
                            <h5
                              className="card-title"
                              style={{ marginTop: "1rem" }}
                            >
                              Amount so far: {parsedResponse.amount} out of{" "}
                              {parsedResponse.goal}
                            </h5>

                            <input
                              className="btn btn-primary"
                              type="button"
                              style={{ marginTop: "2%", marginRight: "1%" }}
                              value="Delete"
                              onClick={this.delete.bind(
                                this,
                                parsedResponse._id
                              )}
                            />
                            <input
                              className="btn btn-primary"
                              type="button"
                              style={{ marginTop: "2%", marginRight: "1%" }}
                              value="Edit"
                              onClick={this.edit.bind(
                                this,
                                true,
                                parsedResponse._id,
                                parsedResponse.saving,
                                parsedResponse.goal,
                                parsedResponse.amount
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
        </div>
      );
    }
  }
}
export default savings;
