import React from 'react';
import { Redirect } from "react-router-dom";
import axios from 'axios';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import _ from 'underscore';
import Dashheader from '../../components/dashheader/dashheader.jsx';
import config from '../../../../resource/config';
import BuyerCompanyShippingAddresses from './../buyer_company_shipping_addresses/buyer_company_shipping_addresses.jsx';
import BuyerCompanyProducts from './../buyer_company_products/buyer_company_products.jsx';
import buyerCompanyShippingAddressTable from '../../../../resource/buyerCompanyShippingAddressTable';
import buyerCompanyProductTable from '../../../../resource/buyerCompanyProductTable';

const base_url = config.base_url;
const buyerCompanyShippingAddressSkState = buyerCompanyShippingAddressTable.skState;
const buyerCompanyProductSkState = buyerCompanyProductTable.skState;
// const activeState = ' active';

class BuyerCompany extends React.Component {
    constructor(props) {		
        super(props);
        this.state = {
            id: '',
            api_base: '',
            edit_page: '',
            name: null,
            billing_address: null,
            description: null,
            child_component_base_url: '',
            parent_path: '',
            toGoback: false,
            shippingAddressClass: '',
            buyerProductClass: '',
            tabActiveStateName: ''
        }
        this.get = this.get.bind(this);
        this.delete = this.delete.bind(this);
        this.handleTabClick = this.handleTabClick.bind(this);
        this.updateToggleState = this.updateToggleState.bind(this);
    }
    
    componentDidMount() {
      const id = this.props.params.params.id;
      const parent_path = `${this.props.skState.apis['GET']}/${id}`;
      const edit_page = `/edit${this.props.skState.apis['UPDATE']}/${id}`;
      const child_component_base_url = `${base_url+this.props.skState.apis['GET']}/${id}`;        
      const shippingAddressClass = this.props.skState.tabs.shippingAddressClass;
      const buyerProductClass = this.props.skState.tabs.buyerProductClass;
      const tabActiveStateName = this.props.skState.tabActiveStateName;

      this.setState({
        shippingAddressClass: shippingAddressClass,
        buyerProductClass: buyerProductClass,
        tabActiveStateName: tabActiveStateName,
        edit_page: edit_page, 
        child_component_base_url: child_component_base_url, 
        parent_path: parent_path
      });
        
      this.get(id);
    }	

    get(id) {
      const api_base = `${this.props.skState.apis['GET']}`
      const api_url = `${base_url+api_base}/${id}.json`;        
      this.setState({api_base: api_base})
      const _this = this;
      axios.get(api_url)
          .then((res) => {
              const id = res.data.id;
              const name = res.data.name;
              const billing_address = res.data.billing_address;
              const description = res.data.description;
              _this.setState({id: id, name: name, billing_address: billing_address, description: description});
          })
          .catch((err) => {
              console.log(err);
          })
    }

    delete() {
        const _this = this;
        const api_url = `${base_url+this.state.api_base}/${this.state.id}.json`;
        axios.delete(api_url)
            .then((res) => {
                if (res.status === 204) {
                    _this.setState({toGoback: true});
                }
            })
            .catch((err) => {
                console.log("err", err);
            })
    }

    handleTabClick(e) {
      const name = e.target.dataset.name;
      const tabActiveStateName = this.state.tabActiveStateName;
      let counterName = '';
      switch(name) {
        case 'shippingAddressClass':
          counterName = 'buyerProductClass'
          break
        default :
          counterName = 'shippingAddressClass'
      } 
      this.updateToggleState({[name]: tabActiveStateName, [counterName]: ''});
    }


    updateToggleState(status) {
      // status = {name: value}
      this.setState(status);
      const names = Object.keys(status);
      names.forEach((name) => {
        this.props.skState.tabs[name] = status[name];
      });
    }

    render() {
      if (this.props.isAuthed === false) {
        return <Redirect to={'/'} />
      }       
      let shippingAddressTable;
      let productTable;

      if (this.state.id) {
        shippingAddressTable = <BuyerCompanyShippingAddresses 
          skState={buyerCompanyShippingAddressSkState} 
          parent_path={this.state.parent_path}
          base_url={this.state.child_component_base_url}
          parent_id={this.state.id}
        />;
        
        productTable = <BuyerCompanyProducts 
          skState={buyerCompanyProductSkState} 
          parent_path={this.state.parent_path}
          base_url={this.state.child_component_base_url}
          parent_id={this.state.id}
        />;

      } else {
        shippingAddressTable = <div></div>;
        productTable = <div></div>;
      }
      if (this.state.toGoback === true) {
          return <Redirect to='/buyer_companies' />
      }		
      return (
        <div>
          <Dashheader subtitle={'Overview'} title={'Buyer company'}/>
          <Link to={this.state.api_base} className="btn btn-outline-info product-btn">Back</Link>
          <div className="hr-divider mt-3 mb-5">
            <h3 className="hr-divider-content hr-divider-heading">{this.state.name}</h3>		      
          </div>
          <div className="card bg-dark text-white">
            <div className="card-body">
              <h5 className="card-title">{this.state.name}</h5>              
              {
                  this.state.billing_address && 
                  <p>Billing address: {this.state.billing_address}</p>
              }   
              {
                  this.state.description && 
                  <p>Description: {this.state.description}</p>
              }                         
              <Link to={`/new/buyer_companies/${this.state.id}/buyers`} className="btn btn-outline-success product-btn float-right">Add buyer</Link>
              <Link to={this.state.edit_page} className="btn btn-primary product-btn">Edit</Link>
              <div onClick={this.delete} className="btn btn-outline-danger product-btn">Delete</div>
            </div>
          </div>
          <div className="hr-divider my-4">
            <ul className="nav nav-pills hr-divider-content hr-divider-nav" role="tablist">
              <li className="nav-item" role="presentation">
                <div
                  onClick={(e) => this.handleTabClick(e)}
                  data-name="shippingAddressClass"
                  className={"nav-link"+this.state.shippingAddressClass}
                  role="tab" data-toggle="tab" aria-controls="shipping-address">Shipping Address</div>
              </li>
              <li className="nav-item" role="presentation">
                <div
                onClick={(e) => this.handleTabClick(e)}
                data-name="buyerProductClass"
                className={"nav-link"+this.state.buyerProductClass} 
                role="tab" data-toggle="tab" aria-controls="buyer-company-product">Product</div>
              </li>
            </ul>
          </div>
          <div className="tab-content">
            <div role="tabpanel" className={"tab-pane"+this.state.shippingAddressClass} id="shipping-address">
              {shippingAddressTable}
            </div>
            <div role="tabpanel" className={"tab-pane"+this.state.buyerProductClass} id="buyer-company-product">
              {productTable}
            </div>
          </div>          
        </div>			
      )
    }	

}

export default BuyerCompany;