import React, { Component } from "react";

class Popup extends Component {
  render() {
    return (
      <div
        className="popup "
        style={{
          position: "fixed",
          width: "100%",
          height: "100%",
          top: "0",
          left: "0",
          right: "0",
          bottom: "0",
          margin: "auto",
          backgroundColor: "#322F40",
          color: "white",
        }}
      >
        <div
          className="popupInner col-"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "45vmin",
            fontSize: "4vmin",
            color: "white",
          }}
        >
          {" "}
          <h1
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontSize: "4vmin",
            }}
          >
            {this.props.text}{" "}
          </h1>
        </div>
        <div
          className="col-4 offset-4"
          style={{
            fontSize: "2vmin",
            color: "white",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "",
          }}
        >
          <button
            className="btn btn-primary  "
            onClick={this.props.submitPopup}
          >
            Yes!
          </button>
          <button
            className="btn btn-primary "
            onClick={this.props.exitPopup}
            style={{
              marginLeft: "1%",
            }}
          >
            No!
          </button>{" "}
        </div>
      </div>
    );
  }
}

export default Popup;
