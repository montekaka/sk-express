import React from 'react';
import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom';
import { Row, Col } from 'reactstrap';
import axios from 'axios';
import _ from 'underscore';
import Dashheader from './../../components/dashheader/dashheader.jsx';
import config from './../../../../resource/config';
import SimpleHeader from './../../components/shared/utils/simpleHeader.jsx';
import SimpleTable from './../../components/shared/utils/simpleTable.jsx';
const base_url = config.base_url;

class Order extends React.Component {
	constructor(props) {		
		super(props);
		this.state = {
      isAuthed: false,
			hasPermission: false,
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
      shipping_infos: []
		}

		this.get = this.get.bind(this);
  }

  componentDidMount() {
  	const id = this.props.params.params.id;
  	this.get(id);
  }

  get(id) {
  	const _this = this;
  	const api_base = `${this.props.skState.apis['GET']}`
  	const api_url = `${base_url+api_base}/${id}.json`;
  	axios.get(api_url)
  		.then((res) => {
  			const data = res.data;
  			let shipping_address = '';
  			let fax_number = '';
  			let shipping_phone_number = '';

  			data.shipping_address ? shipping_address = data.shipping_address : shipping_address = "";
  			data.fax_number ? fax_number = data.fax_number : fax_number = "";
  			data.shipping_phone_number ? shipping_phone_number = data.shipping_phone_number : shipping_phone_number = "";

  			_this.setState({  
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
					billing_headers: ['label','value'],
					billing_infos: [{id: 1,label: 'Buyer name' , value: data.buyer_name}, {id: 2, label: 'Billing address', value: data.billing_address}, {id: 3, label: 'Order date', value: data.order_date}, {id: 4, label: 'Phone number', value: data.phone_number}, {id: 5, label: 'Email', value: data.email}],
					shipping_headers: ['label','value'],
					shipping_infos: [{id: 1,label: 'Buyer name' , value: data.buyer_name}, {id: 2, label: 'Shipping address', value: shipping_address}, {id: 4, label: 'Phone number', value: shipping_phone_number}, {id: 5, label: 'Fax number', value: fax_number}]
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
		return (
			<div>				
				<SimpleHeader pageTitle={this.state.buyer_company_name} pageName={'Order # '+this.state.order_number}/>				
				<div className="simple-header">
					<Row>
						<Col xs="6">
							<h6>Bill to</h6>
							<SimpleTable headers={this.state.billing_headers} data={this.state.billing_infos} cssClass={'text-left'}/>
						</Col>
						<Col xs="6">
							<h6 className="text-right">Ship to</h6>
							<SimpleTable headers={this.state.shipping_headers} data={this.state.shipping_infos} cssClass={'text-right'}/>
						</Col>						
					</Row>
				</div>
	    </div>				
		)
	}
}

export default Order;