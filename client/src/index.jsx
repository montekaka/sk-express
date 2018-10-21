import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
// import $ from 'jquery';
// import Auth from 'j-toker';
import auth from './../../resource/libs/helpers/auth.js'
import FluidNavbar from './components/navbar/navbar.jsx'
import Orders from './pages/orders/orders.jsx'
import Products from './pages/products/products.jsx'
import Product from './pages/products/product.jsx'
import Login from './pages/auth/login.jsx'

// project states
import productTable from './../../resource/productTable';
const productSkState = productTable.skState;

import orderTable from './../../resource/orderTable';
const orderSkState = orderTable.skState;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      toProducts: false,
      isAuthed: PropTypes.bool,
      user: null
    }
    this.handleUserState = this.handleUserState.bind(this);
  }

  handleUserState(user, error){
    //console.log(user, error)
    if (!error) {
      console.log('Email and Password are not matched');
    } else {
      // redirect to dashboard page
      // redirect to order page for now
    }
    this.setState({user: user, isAuthed: error}); 
  }

  componentDidMount(){  
    var _this = this;
    auth.validateToken((user, error) => {
      // console.log(error);
      _this.setState({user: user, isAuthed: error })
    });
  }

  render () {
    return (
      <Router>
        <span className="App">
          <FluidNavbar handleUserState={this.handleUserState} isAuthed={this.state.isAuthed}/>
          <div className="container-fluid container-fluid-spacious">
            
            <Route exact path='/' 
              render= {(props) => <Login isAuthed={this.state.isAuthed} handleUserState={this.handleUserState} />} 
            />    

            <Route exact path='/login' 
              render= {(props) => <Login isAuthed={this.state.isAuthed} handleUserState={this.handleUserState} />} 
            />                      
            <Route exact path='/orders' 
              render= {(props) => <Orders isAuthed={this.state.isAuthed} skState={orderSkState} />} 
            />             
            <Route exact path="/products" 
              render= {
                (props) => <Products skState={productSkState} />
              }
            />     
            <Route path="/products/:id" 
              render= {
                (props) => <Product/> }
            />                                           
          </div>        
        </span>
      </Router>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));