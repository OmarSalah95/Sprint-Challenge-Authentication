import React, { Component } from "react";

const authenticate = FirstComponent => SecondComponent => {
  return class extends Component {
    render() {
      localStorage.getItem("token")
      ? <FirstComponent />
      : <SecondComponent />;
    }
  };
};
