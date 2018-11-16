import React from 'react';
import axios from 'axios';
import _ from 'underscore'
import config from '../../../../resource/config';
import shippingAddressConnectionTable from './../../../../resource/shippingAddressConnectionTable.js'
import SkTable from './../../components/shared/table/skTable.jsx';

const base_url = config.base_url;
const skState = shippingAddressConnectionTable.skState;

class BuyerShippingAddresses extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      buyer_id: null,
      parent_path: null,
      items: []
    }
    this.get = this.get.bind(this);
    this.create = this.create.bind(this);
    this.delete = this.delete.bind(this);
    this.handleClickItem = this.handleClickItem.bind(this);
  }

  componentDidUpdate(prevProps){
    if (this.props.buyer_id !== prevProps.buyer_id) {
      const buyer_id = this.props.buyer_id;
      const parent_path = `${skState.apis['PARENT_GET']}/${buyer_id}`;
      if (buyer_id !== undefined) {
        this.setState({buyer_id: buyer_id, parent_path: parent_path}, () => {
          this.get();
        });
      }
    }
  }

  get() {
    const id = this.state.buyer_id;
    const endpoint_url = `${base_url+skState.apis['PARENT_GET']}/${id+skState.apis['GET']}.json`;
    axios.get(endpoint_url)
    .then((res) => {
      this.setState({items: res.data});
    })
    .catch((err) => {
      console.log(err);
    })
  }

  handleClickItem(shipping_address){    
    // console.log(shipping_address_id)
    const actionType = shipping_address.actionType;
    const endpoint = base_url+this.state.parent_path+skState.apis['GET']+'/'+shipping_address['id']+'.json';
    switch(actionType) {
      case 'Selected':
        this.delete(endpoint);
        break;
      case 'Select':
        this.create(endpoint);
        break;
      default:
        console.log('nothing need to do');
    }    
  }

  create(endpoint){
    const _this = this;
    axios.post(endpoint, {})
      .then((res) => {
        _this.get();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  delete(endpoint){
    const _this = this;
    axios.delete(endpoint)
      .then((res) => {
        _this.get();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {  
    return (
      <div className="card bg-dark text-white">
        <div className="card-body">
          <p>Shipping addresses</p>
          <SkTable 
            headerItems={skState.tableHeaders}
            items={this.state.items}
            apis={skState.apis} 
            parent_path={this.state.parent_path}
            handleClickItem={this.handleClickItem}
          />  
        </div>
      </div>
    )
  }

}

export default BuyerShippingAddresses;
