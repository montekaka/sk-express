import React from 'react';
import { Redirect } from "react-router-dom";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import axios from 'axios';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import _ from 'underscore';
import Dashheader from '../../components/dashheader/dashheader.jsx';
import config from '../../../../resource/config';
import SkModal from '../../components/shared/modal/skModal.jsx';
import OrderForm from './orderForm.jsx';
import OrderControl from './orderControl.jsx';
import OrderItem from './orderItem.jsx';
import OrderProducts   from './orderProducts.jsx';
import moment from 'moment';
import skOrderItem from '../../../../resource/libs/helpers/OrderItemClass.js';

const OrderItemClass = skOrderItem.OrderItemClass;

const now = moment().format('YYYY-MM-DD');
const base_url = config.base_url;

class OrderNew extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      order_number: '',
      company_id: 0,
      buyer_company_id: 0,
      buyer_company_name: '',
      buyer_id: 0,
      buyer_name: '',
      email: '',
      phone_number: '',      
      total_price: 0,
      total_unit: 0,
      order_delivery_date: now,
      order_date: now,
      billing_address: '',
      shipping_address: '',
      is_per_item_delivery_date: false,
      is_delivered: false,
      is_paid: false,
      invoice_id: 0, 
      shipping_method: '',  
      sales_rep: '',
      terms: '',
      slot: '',
      shipping_phone_number: '123456',
      fax_number: '',      
      shipping_addresses: [],
      order_items: [],
      modal: false,
      newOrderItem: null,
    }

    this.toggle = this.toggle.bind(this);
    this.handleModalCancel = this.handleModalCancel.bind(this);
    this.fetchBuyer = this.fetchBuyer.bind(this);
    this.setOrder = this.setOrder.bind(this);
    this.updateState = this.updateState.bind(this);
    this.getBuyerShippingAddresses = this.getBuyerShippingAddresses.bind(this);
    this.handleAddMoreItem = this.handleAddMoreItem.bind(this);
    this.handleSelectProduct = this.handleSelectProduct.bind(this);
  }

  componentDidMount() {       
    const buyer_id = this.props.params.params.buyer_id;
    const buyer_endpoint = base_url + this.props.buyerSkState.apis['GET'] + '/' + buyer_id + '.json';    
    this.getBuyerShippingAddresses(buyer_id);
    this.setOrder(buyer_endpoint); 
  }

  setOrder(buyer_endpoint) {  
    this.fetchBuyer(buyer_endpoint);
    // if(this.props.workingOrder.order.id === undefined) {
    //   this.fetchBuyer(buyer_endpoint);
    // } else {
    //   const order = this.props.workingOrder.order;
    //   this.setState(order);
    // }     
  }

  updateState(data){
    const name = data['name'];
    const value = data['value'];
    const newState = {[name]: value};
    this.setState(newState);
  }

  fetchBuyer(buyer_endpoint) {
    const _this = this;
    axios.get(buyer_endpoint)
      .then((res) => {
        const data = res.data;
        let _order = {
          id: -100,
          buyer_id: data.id,
          buyer_name: data.name,
          email: data.email,
          phone_number: data.phone_number,
          billing_address: data.billing_address,
          buyer_company_id: data.buyer_company_id,
          buyer_company_name: data.buyer_company_name
        }
        // let order = new this.props.OrderClass();
        // order.set(_order);
        // _this.props.workingOrder.order = order;
        this.setState(_order);
      })
      .catch((err) => {
        console.log(err);
      })
  }

  getBuyerShippingAddresses(buyer_id) {
    const endpoint = base_url + this.props.buyerSkState.apis['GET'] + '/' + buyer_id + '/' + this.props.buyerSkState.apis['SHIPPING_ADDRESS_CONNECTIONS_GET'] + '.json';
    const _this = this;
    axios.get(endpoint)
      .then((res) => {
        const data = res.data;
        _this.setState({shipping_addresses: data});
      })
      .catch((err) => {
        console.log(err);
      })
  }

  handleAddMoreItem() {
    const _this = this;
    const n = this.state.order_items.length;
    let order_items = this.state.order_items;
    let orderItem = new OrderItemClass();    
    orderItem.set({id: n * -1});
    this.setState({newOrderItem: orderItem}, () => {
      _this.toggle();
    });
  }

  toggle() {
    this.setState({modal: !this.state.modal});
  }

  handleSelectProduct() {
    const _this = this;
    let order_items = this.state.order_items;
    order_items.push(this.state.newOrderItem);
    this.setState({order_items: order_items, newOrderItem: null}, () => {
      console.log(_this.state.order_items)
      _this.toggle();
    } );
    // console.log(this.state.newOrderItem);
  }

  handleModalCancel() {
    this.toggle();
    this.setState({newOrderItem: null});
  }

  render() {
    return (
      <div>
        <Dashheader subtitle={'Order summary'} title={this.state.buyer_name}/>
        <OrderForm 
        data={this.state} 
        updateState={this.updateState}/>
        {
          this.state.order_items.map((order_item) => 
            <OrderItem key={order_item.id} 
              order_delivery_date={this.state.order_delivery_date} 
              is_per_item_delivery_date={this.state.is_per_item_delivery_date}             
              item={order_item}/>
          )
        }
        <OrderControl addMore={this.handleAddMoreItem}/>
        <Modal isOpen={this.state.modal} toggle={this.handleModalCancel} className={'modal-dialog modal-lg'}>
          <ModalHeader toggle={this.handleModalCancel}>Modal title</ModalHeader>
          <ModalBody>
            <OrderProducts
              base_url={base_url+'/buyer_companies/'+this.state.buyer_company_id} 
              handleOnClick={this.handleSelectProduct}
              newOrderItem={this.state.newOrderItem} />
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={this.handleModalCancel}>Cancel</Button>
          </ModalFooter>
        </Modal>         
      </div>
    )
  }
}

export default OrderNew;  
