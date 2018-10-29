import React from 'react';
import { Redirect } from "react-router-dom";
import axios from 'axios';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import _ from 'underscore';
import Dashheader from '../../components/dashheader/dashheader.jsx';
import config from '../../../../resource/config';

const base_url = config.base_url;

class BuyerBuyerCompanyShippingAddress extends React.Component {
    constructor(props) {		
        super(props);
        this.state = {
            id: '',
            api_base: '',
            edit_page: '',
            address_1: null,
            fax_number: null,
            phone_number: null,
            buyer_company_id: null,
            api_url: '',
            parent_page_url: '',
            toGoback: false
        }
        this.get = this.get.bind(this);
        this.delete = this.delete.bind(this);
    }

    componentDidMount() {
      const _this = this;
      const id = this.props.params.params.id;
      const buyer_company_id = this.props.params.params.buyer_company_id;
      const parent_page_url = `${this.props.skState.apis['PARENT_GET']}/${buyer_company_id}`;

      const api_base = `${parent_page_url}${this.props.skState.apis['GET']}`
      const api_url = `${base_url+api_base}/${id}.json`;       
      const edit_page = `edit/${id}`
      this.setState({
        edit_page: edit_page, 
        id: id, 
        buyer_company_id: buyer_company_id,
        api_base: api_base,
        api_url: api_url,
        parent_page_url: parent_page_url
      }, () => {
        _this.get();
      });
      
    }	

    get() {
      const _this = this;
      axios.get(_this.state.api_url)
          .then((res) => {
              const address_1 = res.data.address_1;
              const phone_number = res.data.phone_number;
              const fax_number = res.data.fax_number;              
              _this.setState({address_1: address_1, phone_number: phone_number, fax_number: fax_number});
          })
          .catch((err) => {
              console.log(err);
          })
    }

    delete() {
        const _this = this;
        const api_url = this.state.api_url;
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
        if (this.state.toGoback === true) {
            return <Redirect to={this.state.parent_page_url} />
        }		
        return (
        <div>
          <Dashheader subtitle={'Overview'} title={'Buyer company shipping address'}/>
          <Link to={this.state.parent_page_url} className="btn btn-outline-info product-btn">Back</Link>
          <div className="hr-divider mt-3 mb-5">
            <h3 className="hr-divider-content hr-divider-heading"></h3>		      
          </div>
          <div className="card bg-dark text-white">
            <div className="card-body">
              <h5 className="card-title">Shipping Address</h5>              
              {
                  this.state.address_1 && 
                  <p>Address: {this.state.address_1}</p>
              }               
              {
                  this.state.phone_number && 
                  <p>Phone number: {this.state.phone_number}</p>
              }                
              {
                  this.state.fax_number && 
                  <p>Fax number: {this.state.fax_number}</p>
              }                                       
              <Link to={this.state.edit_page} className="btn btn-primary product-btn">Edit</Link>
              <div onClick={this.delete} className="btn btn-outline-danger product-btn">Delete</div>
            </div>
          </div>	
        </div>			
        )
    }	

}

export default BuyerBuyerCompanyShippingAddress;