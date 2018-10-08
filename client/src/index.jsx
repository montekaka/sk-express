import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
// import $ from 'jquery';
// import Auth from 'j-toker';
import auth from './../../resource/libs/helpers/auth.js'
import FluidNavbar from './components/navbar/navbar.jsx'
import Orders from './pages/orders/orders.jsx'
import Products from './pages/products/products.jsx'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      toProducts: false,
      isAuthed: false,
      user: null
    }
    this.handleUserState = this.handleUserState.bind(this);
  }

  handleUserState(user, error){
    //console.log(user, error)
    this.setState({user: user, isAuthed: error}); 
  }

  componentDidMount(){    
    var _this = this;
    auth.validateToken((user, error) => {
      _this.setState({user: user, isAuthed: error })
    });
  }

  render () {
    return (
      <Router>
        <span className="App">
          <FluidNavbar handleUserState={this.handleUserState} isAuthed={this.state.isAuthed}/>
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