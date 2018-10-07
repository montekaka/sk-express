import React from 'react';
import axios from 'axios';
import SkTable from './../../components/shared/table/skTable.jsx';
import productTable from './../../../../resource/productTable';
import config from './../../../../resource/config';

const tableHeaders = productTable.tableHeaders;
const base_url = config.base_url;
const get_url = '/products.json';

class Products extends React.Component {
	constructor(props) {		
		super(props);
		this.state = {
			products: []
		}
		this.handleClickLinkToOrder = this.handleClickLinkToOrder.bind(this);
	}

	componentDidMount() {
		const _this = this;
		const api_url = base_url+get_url;
		axios.get(api_url)
			.then((res) => {
				_this.setState({products: res.data})
			})
			.catch((err) => {
				console.log(err);
			});			
	}		


	handleClickLinkToOrder(id){
		console.log(id);
	}

	render() {
		return (
			<div>
		    <div className="hr-divider mt-3 mb-5">
		      <h3 className="hr-divider-content hr-divider-heading">Products</h3>
		      <SkTable headerItems={tableHeaders} items={this.state.products} objectName="orders" handleView={this.handleClickLinkToOrder}/>
		    </div>		    
	    </div>			
		)
	}
}

export default Products;