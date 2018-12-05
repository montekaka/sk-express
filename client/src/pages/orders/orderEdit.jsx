import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import axios from 'axios';
import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom';
import _ from 'underscore';
import Dashheader from '../../components/dashheader/dashheader.jsx';
import config from '../../../../resource/config';
import SkModal from './../../components/shared/modal/skModal.jsx';
import OrderForm from './orderForm.jsx';
import OrderControl from './orderControl.jsx';
import OrderItem from './orderItem.jsx';
import OrderProducts   from './orderProducts.jsx';
import moment from 'moment';
import skOrderItem from '../../../../resource/libs/helpers/OrderItemClass.js';

const OrderItemClass = skOrderItem.OrderItemClass;

const now = moment().format('YYYY-MM-DD');
const base_url = config.base_url;

class OrderEdit extends React.Component {
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
      shipping_phone_number: '',
      fax_number: '',      
      shipping_addresses: [],
      order_items: [],
      modal: false,
      newOrderItem: null,
      errorModal: false,
      errorMessage: 'Please make sure you you fill up order item price',
      toGoback: false
    }

    this.toggle = this.toggle.bind(this);
    this.handleModalCancel = this.handleModalCancel.bind(this);
    this.fetchOrder = this.fetchOrder.bind(this);
    this.setOrder = this.setOrder.bind(this);
    this.updateState = this.updateState.bind(this);
    this.getBuyerShippingAddresses = this.getBuyerShippingAddresses.bind(this);
    this.handleAddMoreItem = this.handleAddMoreItem.bind(this);
    this.handleSelectProduct = this.handleSelectProduct.bind(this);
    this.getProductPriceCategory = this.getProductPriceCategory.bind(this);
    this.calculateTotal = this.calculateTotal.bind(this);
    this.updateOrderItemState = this.updateOrderItemState.bind(this);
    this.submit = this.submit.bind(this);
    this.update = this.update.bind(this);
    this.errorModalToggle = this.errorModalToggle.bind(this);
    this.handleRemoveOrderItem = this.handleRemoveOrderItem.bind(this);
  }

  componentDidMount() {       
    const order_id = this.props.params.params.id;
    const order_endpoint = base_url + this.props.orderSkState.apis['GET'] + '/' + order_id + '.json';
    this.setOrder(order_endpoint); 
  }

  setOrder(order_endpoint) {  
    this.fetchOrder(order_endpoint);   
  }

  fetchOrder(order_endpoint) {
    const _this = this;
    axios.get(order_endpoint)
      .then((res) => {
        const data = res.data;
        const _order_items = res.data.order_items;
        let order_items = [];
        _.each(_order_items, (x) => {
          let order_item = new OrderItemClass();
          order_item.set(x);
          order_items.push(order_item);
        });


        let _order = {
          id: data.id,
          order_number: data.order_number,
          company_id: data.company_id,
          buyer_company_id: data.buyer_company_id,
          buyer_company_name: data.buyer_company_name,
          buyer_id: data.buyer_id,
          buyer_name: data.buyer_name,
          email: data.email,
          phone_number: data.phone_number, 
          total_price: data.total_price, 
          total_unit: data.total_unit, 
          order_delivery_date: data.order_delivery_date, 
          order_date: data.order_date,
          billing_address: data.billing_address,
          shipping_address: data.shipping_address,
          is_per_item_delivery_date: data.is_per_item_delivery_date,
          is_delivered: data.is_delivered,
          is_paid: data.is_paid,
          invoice_id: data.invoice_id,
          shipping_method: data.shipping_method,
          sales_rep: data.sales_rep,
          terms: data.terms,
          slot: data.slot,
          shipping_phone_number: data.shipping_phone_number,
          fax_number: data.fax_number,  
          order_items: order_items    
        }
        this.setState(_order, () => {
          _this.getBuyerShippingAddresses(_this.state.buyer_id);
        });       
      })
      .catch((err) => {
        console.log(err);
      })
  }

 submit() {
    // console.log('hi')
    if(this.state.total_price > 0) {
      this.update();
    } else {
      this.setState({errorModal: true});
    }
  }

  update() {
    const endpoint = base_url+this.props.orderSkState.apis['NEW']+'/'+this.state.id+'.json';
    const data = this.state;
    const _this = this;
    axios.put(endpoint, data)
      .then((res) => {        
        _this.setState({toGoback: true});
      })
      .catch((err) => {
        console.log(err);
      })
  }

  updateState(data){
    const name = data['name'];
    const value = data['value'];
    const newState = {[name]: value};
    this.setState(newState);
  }

  calculateTotal() {
    let total_price = 0;
    _.each(this.state.order_items, (item) => {
      total_price += item['total_price'];
    });
    this.setState({total_price: total_price});
  }

  updateOrderItemState(id, updateStatus){
    let orderItem = _.filter(this.state.order_items, (item) => {
      return item['id'] === id;
    });
    if(orderItem.length > 0) {
      let order_item = orderItem[0];      
      order_item.set(updateStatus);  
      if(updateStatus['total_price']) {
        this.calculateTotal();
      }  
    }
  }

  getProductPriceCategory(id, cb) {
    const _this = this;
    const endpoint = base_url+'/buyer_companies/'+this.state.buyer_company_id+'/external_product_prices/'+id+'.json';
    axios.get(endpoint)
      .then((res) => {
        const internal_price_category_list = res.data['internal_price_category_list'];
        let newOrderItem = _this.state.newOrderItem;
        newOrderItem.set({internal_price_category_list: internal_price_category_list});
        _this.setState({newOrderItem: newOrderItem});
        cb();
      })
      .catch((err) => {
        console.log(err);
      })
  }


  getBuyerShippingAddresses(buyer_id) {
    const _this = this;
    const endpoint = base_url + this.props.buyerSkState.apis['GET'] + '/' + buyer_id + '/' + this.props.buyerSkState.apis['SHIPPING_ADDRESS_CONNECTIONS_GET'] + '.json';    
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
    orderItem.set({id: n * -1, order_id: this.state.id});
    this.setState({newOrderItem: orderItem}, () => {
      _this.toggle();
    });
  }

  toggle() {
    this.setState({modal: !this.state.modal});
  }

  handleSelectProduct() {
    const _this = this;    
    this.getProductPriceCategory(this.state.newOrderItem.external_product_id, () => {
      let order_items = _this.state.order_items;
      order_items.push(_this.state.newOrderItem);
      _this.setState({order_items: order_items, newOrderItem: null}, () => {
        _this.toggle();
      });
    })
    // console.log(this.state.newOrderItem);
  }

  handleRemoveOrderItem(id) {
    const order_items = _.reject(this.state.order_items, (x) => {
      return x.id === id;
    });
    this.setState({order_items: order_items}, () => {
      this.calculateTotal();
    });
  }

  handleModalCancel() {
    this.toggle();
    this.setState({newOrderItem: null});
  }

  errorModalToggle(){
    const errorModal = !this.state.errorModal;
    this.setState({errorModal: errorModal});
  }  

  render() {
    if (this.state.toGoback === true) {
      const link_to = `${this.props.orderSkState.apis['GET']}/${this.state.id}`;
      return <Redirect to= {link_to} />
    }     
    return (
      <div>
        <Dashheader subtitle={'Order summary'} title={this.state.buyer_name}/>
        <OrderForm 
          data={this.state} 
          updateState={this.updateState}
        />
        {
          this.state.order_items.map((order_item) => 
            <OrderItem key={order_item.id} 
              order_delivery_date={this.state.order_delivery_date} 
              is_per_item_delivery_date={this.state.is_per_item_delivery_date}             
              item={order_item}
              buyer_company_id={this.state.buyer_company_id}
              updateOrderItemState={this.updateOrderItemState}
              calculateTotal={this.calculateTotal}
              handleRemoveOrderItem={this.handleRemoveOrderItem}
              />
          )
        }
        <OrderControl 
          addMore={this.handleAddMoreItem}
          backToPage={this.props.orderSkState.apis['GET']+"/"+this.state.id}
          submit={this.submit}
        />
        <Modal isOpen={this.state.modal} toggle={this.handleModalCancel} className={'modal-dialog modal-lg'}>
          <ModalHeader toggle={this.handleModalCancel}>Products</ModalHeader>
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
        <SkModal 
          modal={this.state.errorModal} 
          className={'error'} 
          toggle={this.errorModalToggle}
          modalTitle={'Error'}
          message={this.state.errorMessage}
          closeBtnLabel={'OK'}/>                 
      </div>
    )
  }
}

export default OrderEdit;  
