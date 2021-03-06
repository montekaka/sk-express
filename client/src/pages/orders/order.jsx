import React from 'react';
import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom';
import { Row, Col } from 'reactstrap';
import axios from 'axios';
import _ from 'underscore';
import Dashheader from './../../components/dashheader/dashheader.jsx';
import config from './../../../../resource/config';
import orderSummaryState from './../../../../resource/orderSummary';
import SimpleHeader from './../../components/shared/utils/simpleHeader.jsx';
import SimpleTable from './../../components/shared/simple-table/simpleTable.jsx';
import SimpleList from './../../components/shared/simple-list/simpleList.jsx';

const orderSummaryHeaders = orderSummaryState.skState.orderSummaryHeaders;
const orderItemHeaders = orderSummaryState.skState.orderItemHeaders;
const base_url = config.base_url;

class Order extends React.Component {
	constructor(props) {		
		super(props);
		this.state = {
      isAuthed: false,
			hasPermission: false,
			editPage: '',
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
      order_delivery_date: 0,
      order_date: 0,
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
      order_items: [],
      billing_headers: [],
      billing_infos: [],
      shipping_headers: [],
      shipping_infos: [],
      order_summary: [],
      toGoback: false
		}

		this.get = this.get.bind(this);
    this.delete = this.delete.bind(this);
  }

  componentDidMount() {
  	const id = this.props.params.params.id;
  	this.get(id);
  }

  delete() {
    const _this = this;
    const api_base = this.props.skState.apis['DELETE'];
    const api_url = `${base_url+api_base}/${this.state.id}.json`;
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

  get(id) {
  	const _this = this;
  	const api_base = this.props.skState.apis['GET'];
  	const api_url = `${base_url+api_base}/${id}.json`;
  	let editPage = `/edit${this.props.skState.apis['GET']}/${id}`;
  	axios.get(api_url)
  		.then((res) => {
  			const data = res.data;
  			// let shipping_address = '';
  			// let fax_number = '';
  			// let shipping_phone_number = '';
  			let shipping_address = data.shipping_address ? shipping_address = data.shipping_address : shipping_address = "";
  			let fax_number = data.fax_number ? fax_number = data.fax_number : fax_number = "";
  			let shipping_phone_number = data.shipping_phone_number ? shipping_phone_number = data.shipping_phone_number : shipping_phone_number = "";

  			_this.setState({  
  				editPage: editPage,
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
					order_items: data.order_items,
					billing_headers:  ['label','value'],
					billing_infos: [{id: 1, label: 'Buyer name' , value: data.buyer_name, format: 'string'}, {id: 2, label: 'Billing address', value: data.billing_address, format: 'string'}, {id: 3, label: 'Order date', value: data.order_date, format: 'date'}, {id: 4, label: 'Phone number', value: data.phone_number, format: 'string'}, {id: 5, label: 'Email', value: data.email, format: 'string'}],
					shipping_headers: ['label','value'],
					shipping_infos: [{id: 1,label: 'Buyer name' , value: data.buyer_name}, {id: 2, label: 'Shipping address', value: shipping_address}, {id: 4, label: 'Phone number', value: shipping_phone_number}, {id: 5, label: 'Fax number', value: fax_number}],
          order_summary: [{id: 1, 'shipping_method': data.shipping_method, 'sales_rep': data.sales_rep, 'terms': data.terms, 'slot': data.slot, 'total_price': data.total_price}]
  			})
  		})
  		.catch((err) => {
  			console.log(err);
  		})
  }

	render() {
    if (this.props.isAuthed === false) {
      return <Redirect to={'/'} />
    }	 

    if (this.state.toGoback === true) {
      return <Redirect to='/orders' />
    }       

		return (
			<div>
				<div className="simple-header">       
          <Link to={this.props.skState.apis['GET']} className="btn btn-primary">Back</Link>
					<Link to={this.state.editPage} className="btn btn-primary float-right">Edit</Link>
          <div className="btn btn-outline-danger float-right" onClick={this.delete} >Delete</div>
				</div>				
				<SimpleHeader pageTitle={this.state.buyer_company_name} pageName={'Order # '+this.state.order_number}/>				
				<div className="simple-header">
					<Row>
						<Col xs="6">
							<h6>Bill to</h6>
							<SimpleList headers={this.state.billing_headers} data={this.state.billing_infos}/>
						</Col>
						<Col xs="6">
							<h6 className="text-right">Ship to</h6>
              <SimpleList headers={this.state.shipping_headers} data={this.state.shipping_infos} cssClass={'text-right'}/>
						</Col>						
					</Row>
				</div>
        <div className="card text-white bg-dark">
          <h5 className="card-header">Order summary</h5>
          <div className="card-body">
            <SimpleTable headers={orderSummaryHeaders} data={this.state.order_summary}/>
          </div>          
        </div>
        <div className="card text-white bg-dark">
          <h5 className="card-header">Order items</h5>
          <div className="card-body">
            <SimpleTable headers={orderItemHeaders} data={this.state.order_items}/>
          </div>          
        </div>               
	    </div>				
		)
	}
}

export default Order;