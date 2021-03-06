import React from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom';
import _ from 'underscore';
import Dashheader from '../../components/dashheader/dashheader.jsx';
import BuyerShippingAddresses from './buyer_shipping_addresses.jsx';
import config from '../../../../resource/config';

const base_url = config.base_url;

class Buyer extends React.Component {
    constructor(props) {		
        super(props);
        this.state = {
            id: null,
            api_base: '',
            edit_page: '',
            name: null,
            email: null,
            phone_number: null,
            buyer_company_name: '',
            buyer_company_id: null,
            toGoback: false
        }
        this.get = this.get.bind(this);
        this.delete = this.delete.bind(this);
    }

    componentDidMount() {
      const id = this.props.params.params.id;
      const edit_page = `/edit${this.props.skState.apis['UPDATE']}/${id}`;
      this.setState({edit_page: edit_page, id: id});
      this.get(id);
    }	

    get(id) {
      const api_base = `${this.props.skState.apis['GET']}`
      const api_url = `${base_url+api_base}/${id}.json`;
      this.setState({api_base: api_base})
      const _this = this;
      axios.get(api_url)
        .then((res) => {
            const name = res.data.name;
            const buyer_company_name = res.data.buyer_company_name;
            const buyer_company_id = res.data.buyer_company_id;
            const phone_number = res.data.phone_number;
            _this.setState({name: name, buyer_company_id: buyer_company_id, buyer_company_name: buyer_company_name, phone_number: phone_number});
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
      if (this.props.isAuthed === false) {
        return <Redirect to={'/'} />
      }        
      if (this.state.toGoback === true) {
          return <Redirect to='/buyers' />
      }		
      return (
        <div>
          <Dashheader subtitle={'Overview'} title={'Buyer'}/>
          <Link to={this.state.api_base} className="btn btn-outline-info product-btn">Back</Link>
          <div className="hr-divider mt-3 mb-5">
            <h3 className="hr-divider-content hr-divider-heading">{this.state.name}</h3>		      
          </div>
          <div className="card bg-dark text-white">
            <div className="card-body">
              <h5 className="card-title">{this.state.name}</h5>              
              {
                  this.state.phone_number && 
                  <p>Phone number: {this.state.phone_number}</p>
              }                
              {
                  this.state.email && 
                  <p>Email: {this.state.email}</p>
              }                                       
              {
                  this.state.default_shipping_address && 
                  <p>Shipping address: {this.state.default_shipping_address}</p>
              }   
              <Link to={this.state.edit_page} className="btn btn-primary product-btn">Edit</Link>
              <div onClick={this.delete} className="btn btn-outline-danger product-btn">Delete</div>
            </div>
          </div>	
          <BuyerShippingAddresses buyer_id={this.state.id}/>
        </div>			
      )
    }	

}

export default Buyer;