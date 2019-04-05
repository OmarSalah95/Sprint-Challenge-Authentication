import React, { Component } from "react";
import axios from "axios";

class Jokes extends Component {
  state = {
    jokes: []
  };
  componentDidMount() {
    axios
      .get("/api/jokes")
      .then(res => {
        this.setState({ jokes: res.data });
      })
      .catch(err => {
        console.log(err);
      });
  }
  render() {
    return (
      <div className="Jokes">
        <h1>Jokes page</h1>
        <ul>
          {this.state.jokes.map(joke => (
            <li key={joke.id}>{joke.joke}</li>
          ))}
        </ul>
      </div>
    );
  }
}

export default Jokes;
