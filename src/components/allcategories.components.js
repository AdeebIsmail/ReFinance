import React, { Component } from "react";
import axios from "axios";
import Popup from "./popup.components";

let parsedResponse = [];
let list = [];
let categoryItem = "";

export default class allcategories extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      showPopup: false,
    };
  }

  submitPopup(toDelete, value) {
    if (toDelete === false) {
      this.setState({
        showPopup: !this.state.showPopup,
      });
      categoryItem = value;
    } else {
      const category = { category: categoryItem };
      axios
        .post(
          "http://10.0.0.247:5000/users/category/delete/" +
            window.localStorage.getItem("id"),
          category
        )
        .then(() => {
          window.location.reload(false);
        })
        .catch((err) => console.log(err));
    }
  }

  exitPopup() {
    this.setState({
      showPopup: !this.state.showPopup,
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

  render() {
    if (this.state.showPopup) {
      return (
        <div>
          <Popup
            text="Are you sure you want to delete this category?"
            submitPopup={this.submitPopup.bind(this, true, null)}
            exitPopup={this.exitPopup.bind(this)}
          />
        </div>
      );
    }

    if (this.state.isLoading || list.length === 0) {
      return null;
    } else {
      return (
        <div
          className="card "
          style={{ width: "18rem", textAlign: "center", margin: "auto" }}
        >
          <ul
            className="list-group list-group-flush "
            style={{ textAlign: "center" }}
          >
            {parsedResponse
              .slice(0)
              .reverse()
              .map((parsedResponse) => {
                return (
                  <li
                    className="list-group-item list-group-item-dark "
                    style={{ textAlign: "center" }}
                    onClick={this.submitPopup.bind(this, false, parsedResponse)}
                  >
                    {parsedResponse}
                  </li>
                );
              })}
          </ul>
        </div>
      );
    }
  }
}
