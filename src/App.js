import React, { Component } from "react";
import "./App.css";

import Grid from './Grid';

class App extends Component {
  constructor(props) {
    super(props);

    this.speed = 100;
    this.rows = 30;
    this.cols = 50;

    this.state = {
      generation: 0,
      gridFull: Array(this.rows)
        .fill()
        .map((_) => Array(this.cols).fill(false)),
    };
  }

  render() {
    return (
      <div>
        <h1>The Game of Life</h1>
        <Grid
          rows={this.rows}
          cols={this.cols}
          gridFull={this.state.gridFull}
          selectBox={this.selectBox}
        />
        <h2>Generations: {this.state.generation}</h2>
      </div>
    );
  }
}

export default App;
