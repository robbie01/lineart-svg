// @flow

import React, { Component } from 'react'
import LineArt from './LineArt'

type State = {
  radius: number,
  npoints: number
}

class App extends Component<{}, State> {
  constructor() {
    super()
    this.state = {
      radius: 200,
      npoints: 24
    }
  }
  render() {
    return (
      <div className="App">
        <LineArt radius={this.state.radius} npoints={this.state.npoints} /><br />
        <label>
          Radius
          <input type="number" value={this.state.radius}
            onChange={e => this.setState({ radius: parseInt(e.target.value, 10) })} />
        </label><br />
        <label>
          Points
          <input type="number" value={this.state.npoints}
            onChange={e => this.setState({ npoints: parseInt(e.target.value, 10) })} />
        </label>
      </div>
    )
  }
}

export default App
