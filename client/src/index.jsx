import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";


import $ from 'jquery';

import FluidNavbar from './components/navbar/navbar.jsx'
import Orders from './pages/orders/orders.jsx'
import Products from './pages/products/products.jsx'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
    }
  }

  render () {
    return (
      <Router>
        <span className="App">
          <FluidNavbar/>
          <div className="container-fluid container-fluid-spacious">
            <div className="dashhead mt-4">
              <div className="dashhead-titles">
                <h6 className="dashhead-subtitle">Dashboards</h6>
                <h2 className="dashhead-title">Overview</h2>
              </div>
            </div>
            <Route exact path="/" component={Orders} />
            <Route path="/orders" component={Orders}/>
            <Route path="/products" component={Products}/>
          </div>        
        </span>
      </Router>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));