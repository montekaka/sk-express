import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import Auth from 'j-toker';
import PubSub from 'pubsub-js';
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
  Order,
  OrderNewBuyer,
  OrderNew,
  OrderEdit
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
    var _this = this;
    if (!error) {
      console.log('Email and Password are not matched');
      this.setState({user: user, isAuthed: error});
    } else {
      this.setState({user: user}); 
    }  
  }

  componentDidMount(){  
    var _this = this;
    auth.validateToken((user, error) => {
      _this.setState({isAuthed: error })
    });
  }

  UNSAFE_componentWillMount() {
    var _this = this;
    PubSub.subscribe('auth.validation.success', (ev, user) => {
      console.log('user', user)
      _this.setState({isAuthed: true})
    }) 
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
            <Route exact path='/orders/:id' 
              render= {(props) => <Order isAuthed={this.state.isAuthed} skState={orderSkState} params={props.match}/>} 
            />              
            <Route exact path='/orders' 
              render= {(props) => <Orders isAuthed={this.state.isAuthed} skState={orderSkState} workingOrder={workingOrder} OrderClass={OrderClass}/>} 
            />  
            <Route exact path='/new/order/buyers' 
              render= {(props) => <OrderNewBuyer isAuthed={this.state.isAuthed} skState={orderBuyerSkState} workingOrder={workingOrder} OrderClass={OrderClass} orderSkState={orderSkState}/>} 
            /> 
            <Route exact path='/edit/orders/:id' 
              render= {(props) => <OrderEdit 
                isAuthed={this.state.isAuthed} 
                skState={orderBuyerSkState} 
                workingOrder={workingOrder} 
                OrderClass={OrderClass}
                buyerSkState={buyerSkState} 
                orderSkState={orderSkState} 
                params={props.match}/>} 
            />             
            <Route exact path='/new/order/buyers/:buyer_id' 
              render= {(props) => <OrderNew isAuthed={this.state.isAuthed} 
              skState={orderBuyerSkState} 
              buyerSkState={buyerSkState}
              orderSkState={orderSkState}
              workingOrder={workingOrder} OrderClass={OrderClass} params={props.match}/>} 
            />                                     
            <Route exact path="/products" 
              render= {
                (props) => <Products skState={productSkState} isAuthed={this.state.isAuthed}/>
              }
            />     
            <Route path="/new/products" 
              render= {
                (props) => <ProductNew skState={productSkState} isAuthed={this.state.isAuthed} /> }
            />                            
            <Route exact path="/products/:id" 
              render= {
                (props) => <Product skState={productSkState} params={props.match} isAuthed={this.state.isAuthed}/> }
            /> 
            <Route exact path="/edit/products/:id" 
              render= {
                (props) => <ProductEdit skState={productSkState} params={props.match} isAuthed={this.state.isAuthed}/> }
            />            
            <Route exact path="/buyer_companies" 
              render= {
                (props) => <BuyerCompanies skState={buyerComapnySkState} isAuthed={this.state.isAuthed}/> }
            />                               
            <Route exact path="/buyer_companies/:id" 
              render= {
                (props) => <BuyerCompany skState={buyerComapnySkState} params={props.match} isAuthed={this.state.isAuthed}/> }
            /> 
            <Route exact exact path="/new/buyer_companies" 
              render= {
                (props) => <BuyerCompanyNew skState={buyerComapnySkState} isAuthed={this.state.isAuthed}/> }
            />      
            <Route exact path="/edit/buyer_companies/:id" 
              render= {
                (props) => <BuyerCompanyEdit skState={buyerComapnySkState} params={props.match} isAuthed={this.state.isAuthed}/> }
            /> 
            <Route exact path="/buyers" 
              render= {
                (props) => <Buyers skState={buyerSkState} isAuthed={this.state.isAuthed}/> }
            />  
            <Route exact path="/buyers/:id" 
              render= {
                (props) => <Buyer skState={buyerSkState} params={props.match} isAuthed={this.state.isAuthed}/> }
            />   
            <Route exact path="/edit/buyers/:id" 
              render= {
                (props) => <BuyerEdit skState={buyerSkState} params={props.match} isAuthed={this.state.isAuthed}/> }
            />         
            <Route exact path="/new/buyer_companies/:buyer_company_id/buyers" 
              render= {
                (props) => <BuyerNew skState={buyerSkState} params={props.match} isAuthed={this.state.isAuthed}/> }
            /> 
            <Route exact path="/buyer_companies/:buyer_company_id/shipping_addresses/:id" 
              render= {
                (props) => <BuyerCompanyShippingAddress skState={buyerCompanyShippingAddressSkState} params={props.match} isAuthed={this.state.isAuthed}/> }
            />             
            <Route exact path="/buyer_companies/:buyer_company_id/new/shipping_addresses" 
              render= {
                (props) => <BuyerCompanyShippingAddressNew skState={buyerCompanyShippingAddressSkState} params={props.match} isAuthed={this.state.isAuthed}/> }
            /> 
            <Route exact path="/buyer_companies/:buyer_company_id/shipping_addresses/edit/:id" 
              render= {
                (props) => <BuyerCompanyShippingAddressEdit skState={buyerCompanyShippingAddressSkState} params={props.match} isAuthed={this.state.isAuthed}/> }
            />    
            <Route exact path="/buyer_companies/:buyer_company_id/external_product_prices/:id" 
              render= {
                (props) => <BuyerCompanyProduct skState={buyerCompanyProductSkState} params={props.match} isAuthed={this.state.isAuthed}/> }
            />  
            <Route exact path="/buyer_companies/:buyer_company_id/new/external_product_prices" 
              render= {
                (props) => <BuyerCompanyProductPickProduct skState={pickProductSkState} params={props.match} isAuthed={this.state.isAuthed}/> }
            />  
            <Route exact path="/buyer_companies/:buyer_company_id/new/external_product_prices/products/:product_id" 
              render= {
                (props) => <BuyerCompanyProductNew skState={buyerCompanyProductSkState} params={props.match} isAuthed={this.state.isAuthed}/> }
            />                                                                                                                                                                                              
          </div>        
        </span>
      </Router>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));