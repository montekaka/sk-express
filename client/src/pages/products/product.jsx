import React from 'react';
import axios from 'axios';
import _ from 'underscore';
import Dashheader from './../../components/dashheader/dashheader.jsx';
import config from './../../../../resource/config';

const base_url = config.base_url;

class Product extends React.Component {
	constructor(props) {		
		super(props);
		this.state = {
			id: '',
			product_code: null,
			name: null,
			price: 0,
			warehouse_inventories: []
		}
		this.get = this.get.bind(this);
	}

	componentDidMount() {
	  const id = this.props.params.params.id;
	  this.get(id);
	}	

	get(id) {
		const api_url = `${base_url+this.props.skState.apis['GET']}/${id}.json`;
		const _this = this;
		axios.get(api_url)
			.then((res) => {
				const id = res.data.id;
				const product_code = res.data.product_code;
				const name = res.data.name;
				const price = res.data.price;
				const warehouse_inventories = res.data.warehouse_inventories;
				_this.setState({id: id, product_code: product_code, name: name, price: price, warehouse_inventories: warehouse_inventories});
			})
			.catch((err) => {
				console.log(err);
			})

	}



	render() {
		return (
			<div>
				<Dashheader subtitle={'Overview'} title={'Product Info'}/>
				<button type="button" className="btn btn-outline-info product-btn">Back</button>
		    <div className="hr-divider mt-3 mb-5">
		      <h3 className="hr-divider-content hr-divider-heading">{this.state.name}</h3>		      
		    </div>
		    <div className="card bg-dark text-white">
		    	<div className="card-body">
		    		<h5 className="card-title">{this.state.name}</h5>
		    		<p className="card-text">Product code: {this.state.product_code}</p>
		    		<p className="card-text">Price: HK${this.state.price}</p>
		    		<button type="button" className="btn btn-primary product-btn">Edit</button>
		    		<button type="button" className="btn btn-outline-danger product-btn">Delete</button>
		    	</div>
		    </div>		    	    	
	    </div>			
		)
	}	

}

export default Product;