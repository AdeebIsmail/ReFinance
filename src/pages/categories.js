import React, { Component } from "react";
import axios from "axios";
import AllCategories from "../components/allcategories.components";

export default class categories extends Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.enterCategory = this.enterCategory.bind(this);

    this.state = {
      category: "",
      errorText: "",
    };
  }

  enterCategory(e) {
    this.setState({
      category: e.target.value,
    });
  }

  onSubmit(e) {
    e.preventDefault();

    const category = {
      category: this.state.category,
    };

    this.setState({
      category: "",
    });
    console.log(window.localStorage.getItem("id"));
    axios
      .post(
        "http://10.0.0.247:5000/users/category/" +
          window.localStorage.getItem("id"),
        category
      )
      .then(() => {
        window.location.reload(false);
      })
      .catch((err) =>
        this.setState({
          errorText: "You cannot have the same category twice",
          category: "",
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
              Enter your new category!
            </label>
            <input
              className="col- offset- form-control"
              type="text"
              required
              style={{ marginTop: "3rem" }}
              onChange={this.enterCategory}
              value={this.state.category}
            />
            <small
              style={{
                color: "red",

                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {this.state.errorText}
            </small>
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
              marginTop: "2rem",
              fontSize: 19,
              color: "white",
            }}
          >
            All categories
          </h1>
          <div className="col- offset-">
            <AllCategories />
          </div>
        </div>
      </div>
    );
  }
}
