import React from 'react';
import { Redirect } from "react-router-dom";
import axios from 'axios';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import _ from 'underscore';
import Dashheader from '../../components/dashheader/dashheader.jsx';
import config from '../../../../resource/config';
import BuyerCompanyShippingAddresses from './../buyer_company_shipping_addresses/buyer_company_shipping_addresses.jsx';
import buyerCompanyShippingAddressTable from '../../../../resource/buyerCompanyShippingAddressTable';

const base_url = config.base_url;
const buyerCompanyShippingAddressSkState = buyerCompanyShippingAddressTable.skState;

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
            toGoback: false
        }
        this.get = this.get.bind(this);
        this.delete = this.delete.bind(this);
    }
    
    componentDidMount() {
      const id = this.props.params.params.id;
      const edit_page = `/edit${this.props.skState.apis['UPDATE']}/${id}`;
      const child_component_base_url = `${base_url+this.props.skState.apis['GET']}/${id}`;        
      this.setState({edit_page: edit_page, child_component_base_url: child_component_base_url});
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
    
    render() {
      let shippingAddressTable;
      if (this.state.id) {
        shippingAddressTable = <BuyerCompanyShippingAddresses 
          skState={buyerCompanyShippingAddressSkState} 
          base_url={this.state.child_component_base_url}
          parent_id={this.state.id}
        />;
      } else {
        shippingAddressTable = <div>Hello world</div>;
      }
      if (this.state.toGoback === true) {
          return <Redirect to='/buyer_companies' />
      }		
      return (
        <div>
          <Dashheader subtitle={'Overview'} title={'Buyer comapny'}/>
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
              <Link to={this.state.edit_page} className="btn btn-primary product-btn">Edit</Link>
              <div onClick={this.delete} className="btn btn-outline-danger product-btn">Delete</div>
            </div>
          </div>
          {shippingAddressTable}
        </div>			
      )
    }	

}

export default BuyerCompany;