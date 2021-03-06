import React, { Component } from "react";
import "./App.css";

import Grid from "./Grid";
import Buttons from "./Buttons";

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
  };

  seed = () => {
    const gridCopy = JSON.parse(JSON.stringify(this.state.gridFull));
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        if (Math.floor(Math.random() * 5) === 1) {
          gridCopy[i][j] = true;
        } else {
          gridCopy[i][j] = false;
        }
      }
    }
    this.setState({
      gridFull: gridCopy,
    });
  };

  playButton = () => {
    clearInterval(this.intervalId);
    this.intervalId = setInterval(this.play, this.speed);
  };

  pauseButton = () => {
    clearInterval(this.intervalId);
  };

  slow = () => {
    this.speed = 1000;
    this.playButton();
  };

  fast = () => {
    this.speed = 100;
    this.playButton();
  };

  clear = () => {
    const grid = Array(this.rows)
      .fill()
      .map((_) => Array(this.cols).fill(false));
    this.setState({
      gridFull: grid,
      generation: 0,
    });
  };

  gridSize = (size) => {
    switch (size) {
      case "1":
        this.cols = 20;
        this.rows = 10;
        break;
      case "2":
        this.cols = 50;
        this.rows = 30;
        break;
      default:
        this.cols = 70;
        this.rows = 50;
        break;
    }
    this.clear();
  };

  play = () => {
    let g = this.state.gridFull;
    let g2 = JSON.parse(JSON.stringify(this.state.gridFull));

    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        let count = 0;
        if (i > 0) if (g[i - 1][j]) count += 1;
        if (i > 0 && j > 0) if (g[i - 1][j - 1]) count += 1;
        if (i > 0 && j < this.cols - 1) if (g[i - 1][j + 1]) count += 1;
        if (j < this.cols - 1) if (g[i][j + 1]) count += 1;
        if (j > 0) if (g[i][j - 1]) count += 1;
        if (i < this.rows - 1) if (g[i + 1][j]) count += 1;
        if (i < this.rows - 1 && j > 0) if (g[i + 1][j - 1]) count += 1;
        if (i < this.rows - 1 && j < this.cols - 1 && g[i + 1][j + 1])
          count += 1;
        if (g[i][j] && (count < 2 || count > 3)) g2[i][j] = false;
        if (!g[i][j] && count === 3) g2[i][j] = true;
      }
    }
    this.setState({
      gridFull: g2,
      generation: this.state.generation + 1,
    });
  };

  componentDidMount() {
    this.seed();
  }

  render() {
    return (
      <div>
        <h1>The Game of Life</h1>
        <Buttons
          playButton={this.playButton}
          pauseButton={this.pauseButton}
          slow={this.slow}
          fast={this.fast}
          clear={this.clear}
          seed={this.seed}
          gridSize={this.gridSize}
        />
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
