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

  selectBox = (row, col) => {
    const gridCopy = JSON.parse(JSON.stringify(this.state.gridFull));
    gridCopy[row][col] = !gridCopy[row][col];
    this.setState({
      gridFull: gridCopy,
    });
  }

  seed = () => {
    const gridCopy = JSON.parse(JSON.stringify(this.state.gridFull));
    for(let i=0; i<this.rows; i++) {
      for(let j=0; j<this.cols; j++) {
        if(Math.floor(Math.random() * 5)  === 1) {
          gridCopy[i][j] = true;
        }
      }
    }
    this.setState({
      gridFull: gridCopy,
    });
  }

  componentDidMount() {
    this.seed();
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
