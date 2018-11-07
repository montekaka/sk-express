import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
// import $ from 'jquery';
// import Auth from 'j-toker';
import auth from './../../resource/libs/helpers/auth.js'
import FluidNavbar from './components/navbar/navbar.jsx'
import Login from './pages/auth/login.jsx'
import {
  BuyerCompanies,
  BuyerCompany,
  BuyerCompanyNew,
  BuyerCompanyEdit,
  Buyers,
  Buyer,
  BuyerEdit,
  BuyerNew,
  BuyerCompanyShippingAddress,
  BuyerCompanyShippingAddressNew,
  BuyerCompanyShippingAddressEdit,
  BuyerCompanyProductPickProduct,
  BuyerCompanyProduct,
  BuyerCompanyProductNew,  
  Products,
  Product,
  ProductNew,
  ProductEdit,
  Orders,
  OrderNewBuyer
} from './pages'

import orderTable from './../../resource/orderTable';
import orderBuyerTable from './../../resource/orderBuyerTable';
import productTable from './../../resource/productTable';
import buyerCompanyTable from './../../resource/buyerCompanyTable';
import buyerTable from './../../resource/buyerTable';
import buyerCompanyShippingAddressTable from './../../resource/buyerCompanyShippingAddressTable';
import pickProductTable from './../../resource/pickProductTable';
import buyerCompanyProductTable from './../../resource/buyerCompanyProductTable';
import orderState from './../../resource/orderCollection';
import orderClass from './../../resource/libs/helpers/OrderClass';

const orderSkState = orderTable.skState;
const orderBuyerSkState = orderBuyerTable.skState;
const productSkState = productTable.skState;
const buyerComapnySkState = buyerCompanyTable.skState;
const buyerSkState = buyerTable.skState;
const buyerCompanyShippingAddressSkState = buyerCompanyShippingAddressTable.skState;
const pickProductSkState = pickProductTable.skState;
const buyerCompanyProductSkState = buyerCompanyProductTable.skState;
const workingOrder = orderState.workingOrder;

const OrderClass = orderClass.OrderClass;

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
              render= {(props) => <Orders isAuthed={this.state.isAuthed} skState={orderSkState} workingOrder={workingOrder} OrderClass={OrderClass}/>} 
            />  
            <Route exact path='/new/order/buyers' 
              render= {(props) => <OrderNewBuyer isAuthed={this.state.isAuthed} skState={orderBuyerSkState} workingOrder={workingOrder} OrderClass={OrderClass}/>} 
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
            <Route exact path="/products/:id" 
              render= {
                (props) => <Product skState={productSkState} params={props.match}/> }
            /> 
            <Route exact path="/edit/products/:id" 
              render= {
                (props) => <ProductEdit skState={productSkState} params={props.match}/> }
            />            
            <Route exact path="/buyer_companies" 
              render= {
                (props) => <BuyerCompanies skState={buyerComapnySkState} /> }
            />                               
            <Route exact path="/buyer_companies/:id" 
              render= {
                (props) => <BuyerCompany skState={buyerComapnySkState} params={props.match}/> }
            /> 
            <Route exact exact path="/new/buyer_companies" 
              render= {
                (props) => <BuyerCompanyNew skState={buyerComapnySkState} /> }
            />      
            <Route exact path="/edit/buyer_companies/:id" 
              render= {
                (props) => <BuyerCompanyEdit skState={buyerComapnySkState} params={props.match}/> }
            /> 
            <Route exact path="/buyers" 
              render= {
                (props) => <Buyers skState={buyerSkState} /> }
            />  
            <Route exact path="/buyers/:id" 
              render= {
                (props) => <Buyer skState={buyerSkState} params={props.match}/> }
            />   
            <Route exact path="/edit/buyers/:id" 
              render= {
                (props) => <BuyerEdit skState={buyerSkState} params={props.match}/> }
            />         
            <Route exact path="/new/buyer_companies/:buyer_company_id/buyers" 
              render= {
                (props) => <BuyerNew skState={buyerSkState} params={props.match}/> }
            /> 
            <Route exact path="/buyer_companies/:buyer_company_id/shipping_addresses/:id" 
              render= {
                (props) => <BuyerCompanyShippingAddress skState={buyerCompanyShippingAddressSkState} params={props.match}/> }
            />             
            <Route exact path="/buyer_companies/:buyer_company_id/new/shipping_addresses" 
              render= {
                (props) => <BuyerCompanyShippingAddressNew skState={buyerCompanyShippingAddressSkState} params={props.match}/> }
            /> 
            <Route exact path="/buyer_companies/:buyer_company_id/shipping_addresses/edit/:id" 
              render= {
                (props) => <BuyerCompanyShippingAddressEdit skState={buyerCompanyShippingAddressSkState} params={props.match}/> }
            />    
            <Route exact path="/buyer_companies/:buyer_company_id/external_product_prices/:id" 
              render= {
                (props) => <BuyerCompanyProduct skState={buyerCompanyProductSkState} params={props.match}/> }
            />  
            <Route exact path="/buyer_companies/:buyer_company_id/new/external_product_prices" 
              render= {
                (props) => <BuyerCompanyProductPickProduct skState={pickProductSkState} params={props.match}/> }
            />  
            <Route exact path="/buyer_companies/:buyer_company_id/new/external_product_prices/products/:product_id" 
              render= {
                (props) => <BuyerCompanyProductNew skState={buyerCompanyProductSkState} params={props.match}/> }
            />                                                                                                                                                                                              
          </div>        
        </span>
      </Router>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));