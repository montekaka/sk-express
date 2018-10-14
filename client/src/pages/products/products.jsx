import React from 'react';
import axios from 'axios';
import SkTable from './../../components/shared/table/skTable.jsx';
import Dashheader from './../../components/dashheader/dashheader.jsx';
import productTable from './../../../../resource/productTable';
import config from './../../../../resource/config';

const tableHeaders = productTable.tableHeaders;
const base_url = config.base_url;
const get_url = '/products.json';

class Products extends React.Component {
	constructor(props) {		
		super(props);
		this.state = {
			products: [],
			perPage: 10,
			totalPage: 0,
			currentPage: 0
		}
		this.handleClickLinkToOrder = this.handleClickLinkToOrder.bind(this);
	}

	componentDidMount() {
		const _this = this;
		const api_url = base_url+get_url;
		axios.get(api_url)
			.then((res) => {
				let perPage = Number(res.headers['per-page']);
				let totalPage = Number(res.headers['total']);
				_this.setState({products: res.data, perPage: perPage, totalPage: totalPage})
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
				<Dashheader subtitle={'Overview'} title={'Product'}/>
		    <div className="hr-divider mt-3 mb-5">
		      <h3 className="hr-divider-content hr-divider-heading">Products</h3>		      
		      <p>Total Page: {this.state.totalPage}</p>
		    </div>		    
		    <SkTable headerItems={tableHeaders} items={this.state.products} objectName="orders" handleView={this.handleClickLinkToOrder}/>
	    </div>			
		)
	}
}

export default Products;