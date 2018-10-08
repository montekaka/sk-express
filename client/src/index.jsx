import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
// import $ from 'jquery';
// import Auth from 'j-toker';
import auth from './../../resource/libs/helpers/auth.js'
import FluidNavbar from './components/navbar/navbar.jsx'
import Orders from './pages/orders/orders.jsx'
import Products from './pages/products/products.jsx'
import Login from './pages/auth/login.jsx'

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
      console.log(error);
      _this.setState({user: user, isAuthed: error })
    });
  }

  render () {
    return (
      <Router>
        <span className="App">
          <FluidNavbar handleUserState={this.handleUserState} isAuthed={this.state.isAuthed}/>
          <div className="container-fluid container-fluid-spacious">

            <Route exact path="/" component={Login} />
            <Route exact path="/login" component={Login} />
            <Route path='/orders' 
              render={(props) => <Orders isAuthed={this.state.isAuthed} />} 
            />
            <Route path="/products" component={Products}/>            
          </div>        
        </span>
      </Router>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));