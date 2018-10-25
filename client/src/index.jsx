import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
// import $ from 'jquery';
// import Auth from 'j-toker';
import auth from './../../resource/libs/helpers/auth.js'
import FluidNavbar from './components/navbar/navbar.jsx'
import Login from './pages/auth/login.jsx'

/* Order */
import Orders from './pages/orders/orders.jsx'
// project states
import orderTable from './../../resource/orderTable';
const orderSkState = orderTable.skState;

/* Product */
import Products from './pages/products/products.jsx'
import Product from './pages/products/product.jsx'
import ProductNew from './pages/products/productNew.jsx'
import ProductEdit from './pages/products/productEdit.jsx'
// project states
import productTable from './../../resource/productTable';
const productSkState = productTable.skState;

/* Buyer Company*/
import BuyerCompanies from './pages/buyer_companies/buyer_companies.jsx'
import BuyerCompany from './pages/buyer_companies/buyer_company.jsx'
import BuyerCompanyNew from './pages/buyer_companies/buyer_companyNew.jsx'
import BuyerCompanyEdit from './pages/buyer_companies/buyer_companyEdit.jsx'
// project states
import buyerCompanyTable from './../../resource/buyerCompanyTable';
const buyerComapnySkState = buyerCompanyTable.skState;




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
            <Route path="/new/products" 
              render= {
                (props) => <ProductNew skState={productSkState} /> }
            />                                 
            <Route path="/products/:id" 
              render= {
                (props) => <Product skState={productSkState} params={props.match}/> }
            /> 
            <Route path="/edit/products/:id" 
              render= {
                (props) => <ProductEdit skState={productSkState} params={props.match}/> }
            />            
            <Route exact path="/buyer_companies" 
              render= {
                (props) => <BuyerCompanies skState={buyerComapnySkState} /> }
            />                   
            <Route path="/buyer_companies/:id" 
              render= {
                (props) => <BuyerCompany skState={buyerComapnySkState} params={props.match}/> }
            /> 
            <Route path="/new/buyer_companies" 
              render= {
                (props) => <BuyerCompanyNew skState={buyerComapnySkState} /> }
            />      
            <Route path="/edit/buyer_companies/:id" 
              render= {
                (props) => <BuyerCompanyEdit skState={buyerComapnySkState} params={props.match}/> }
            />                                                             
          </div>        
        </span>
      </Router>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));