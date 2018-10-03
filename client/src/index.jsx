import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import $ from 'jquery';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
    }
  }

  render () {
    return (
      <h1>Hello world</h1>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));