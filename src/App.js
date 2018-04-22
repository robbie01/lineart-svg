// @flow

import React, { Component } from "react";
import LineArt from "./LineArt";

type State = {
  radius: number,
  npoints: number,
  animate: boolean
};

class App extends Component<{}, State> {
  constructor() {
    super();
    this.state = {
      radius: 200,
      npoints: 24,
      animate: false
    };
  }
  render() {
    return (
      <div>
        <LineArt
          radius={this.state.radius}
          npoints={this.state.npoints}
          animate={this.state.animate}
        />
        <br />
        <label>
          Radius
          <input
            type="number"
            value={this.state.radius}
            onChange={e =>
              this.setState({ radius: parseInt(e.target.value, 10) })
            }
          />
        </label>
        <br />
        <label>
          Points
          <input
            type="number"
            value={this.state.npoints}
            onChange={e =>
              this.setState({ npoints: parseInt(e.target.value, 10) })
            }
          />
        </label>
        <br />
        <label>
          Animate
          <input
            type="checkbox"
            checked={this.state.animate}
            onChange={e => this.setState({ animate: e.target.checked })}
          />
        </label>
      </div>
    );
  }
}

export default App;
