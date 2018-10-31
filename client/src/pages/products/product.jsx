import React from 'react';
import { Redirect } from "react-router-dom";
import axios from 'axios';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import _ from 'underscore';
import Dashheader from './../../components/dashheader/dashheader.jsx';
import config from './../../../../resource/config';

const base_url = config.base_url;

class Product extends React.Component {
	constructor(props) {		
		super(props);
		this.state = {
			id: '',
			api_base: '',
			edit_page: '',
			product_code: null,
			name: null,
			price_category_1_label: null,
			price_category_2_label: null,
			price_category_3_label: null,
			price_category_1_unit: 0,
			price_category_2_unit: 0,
			price_category_3_unit: 0,
			price: 0,
			toGoback: false,
			warehouse_inventories: []
		}
		this.get = this.get.bind(this);
		this.delete = this.delete.bind(this);
	}

	componentDidMount() {
	  const id = this.props.params.params.id;
	  const edit_page = `/edit${this.props.skState.apis['UPDATE']}/${id}`;
	  console.log(edit_page);
	  this.setState({edit_page: edit_page});
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
				const product_code = res.data.product_code;
				const name = res.data.name;
				const price = res.data.price;
				const price_category_1_label = res.data.price_category_1_label;
				const price_category_2_label = res.data.price_category_2_label;
				const price_category_3_label = res.data.price_category_3_label;
				const price_category_1_unit = res.data.price_category_1_unit;
				const price_category_2_unit = res.data.price_category_2_unit;
				const price_category_3_unit = res.data.price_category_3_unit;
				const warehouse_inventories = res.data.warehouse_inventories;
				_this.setState({id: id, product_code: product_code
					, name: name, price: price
					, warehouse_inventories: warehouse_inventories
					, price_category_1_label: price_category_1_label
					, price_category_2_label: price_category_2_label
					, price_category_3_label: price_category_3_label
					, price_category_1_unit: price_category_1_unit
					, price_category_2_unit: price_category_2_unit
					, price_category_3_unit: price_category_3_unit										
				});
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
		if (this.state.toGoback === true) {
			return <Redirect to='/products' />
		}		
		return (
			<div>
				<Dashheader subtitle={'Overview'} title={'Product Info'}/>
				<Link to={this.state.api_base} className="btn btn-outline-info product-btn">Back</Link>
		    <div className="hr-divider mt-3 mb-5">
		      <h3 className="hr-divider-content hr-divider-heading">{this.state.name}</h3>		      
		    </div>
		    <div className="card bg-dark text-white">
		    	<div className="card-body">
		    		<h5 className="card-title">{this.state.name}</h5>
					<p>Product code: {this.state.product_code}</p>
					<p>Price HK$ {this.state.price}</p>
					<p>Bundle category 1: {this.state.price_category_1_label} {this.state.price_category_1_unit}</p>
					<p>Bundle category 2: {this.state.price_category_2_label} {this.state.price_category_2_unit}</p>
					<p>Bundle category 3: {this.state.price_category_3_label} {this.state.price_category_3_unit}</p>
					<div>
		    			<Link to={this.state.edit_page} className="btn btn-primary product-btn">Edit</Link>
		    			<div onClick={this.delete} className="btn btn-outline-danger product-btn">Delete</div>						
					</div>							
		    	</div>
		    </div>		    	    	
	    </div>			
		)
	}	

}

export default Product;