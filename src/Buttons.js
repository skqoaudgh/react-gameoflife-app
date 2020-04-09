import React, { Component } from "react";
import { Button, ButtonGroup, Dropdown, DropdownButton } from "react-bootstrap";

class Buttons extends Component {
  handleSelect = (event) => {
    this.props.gridSize(event)
  }

  render() {
    return (
      <div className="center">
        <ButtonGroup>
          <Button variant="secondary" onClick={this.props.playButton}>
            Play
          </Button>
          <Button variant="secondary" onClick={this.props.pauseButton}>
            Pause
          </Button>
          <Button variant="secondary" onClick={this.props.clear}>
            Clear
          </Button>
          <Button variant="secondary" onClick={this.props.slow}>
            Slow
          </Button>
          <Button variant="secondary" onClick={this.props.fast}>
            Fast
          </Button>
          <Button variant="secondary" onClick={this.props.seed}>
            Seed
          </Button>
          <DropdownButton
            title="Grid Size"
            id="size-menu"
            onSelect={this.handleSelect}
          >
            <Dropdown.Item eventKey="1">20x10</Dropdown.Item>
            <Dropdown.Item eventKey="2">50x30</Dropdown.Item>
            <Dropdown.Item eventKey="3">70x50</Dropdown.Item>
          </DropdownButton>
        </ButtonGroup>
      </div>
    );
  }
}

export default Buttons;
