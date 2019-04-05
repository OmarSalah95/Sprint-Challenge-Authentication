import React, { Component } from "react";
import Login from "./components/Login.jsx";
import Jokes from "./components/jokes.jsx";
import NavBar from "./components/NavBar";
import { Route } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <NavBar />
        <Route path="/login" component={Login} />
        <PrivateRoute path="/jokes" component={Jokes} />
      </div>
    );
  }
}

export default App;
