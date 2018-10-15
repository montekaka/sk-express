import React from 'react';
import axios from 'axios';
import SkTable from './../../components/shared/table/skTable.jsx';
import SkPagination from './../../components/shared/pagination/skPagination.jsx';
import Dashheader from './../../components/dashheader/dashheader.jsx';
import productTable from './../../../../resource/productTable';
import config from './../../../../resource/config';
import paginationList from './../../../../resource/libs/helpers/paginationList';

const tableHeaders = productTable.tableHeaders;
const base_url = config.base_url;
const get_url = '/products.json';
const getPaginationList = paginationList.getPaginationList;

class Products extends React.Component {
	constructor(props) {		
		super(props);
		this.state = {
			products: [],			
			total: 0,
			totalPage: 0,
			perPage: 8,			
			currentPage: 1,
			startPage: 1,
			pageItemsCount: 10,
			pageItems: []
		}
		this.handleClickLinkToOrder = this.handleClickLinkToOrder.bind(this);
		this.fetch = this.fetch.bind(this);
		this.handleClickPageNumber = this.handleClickPageNumber.bind(this);
	}
	//getPaginationList = (currentPage, start, items, min, max)
	componentDidMount() {				
		this.fetch(this.state.currentPage);
	}		

	fetch(page_number){
		const _this = this;
		const api_url = `${base_url+get_url}?page=${page_number}&per_page=${_this.state.perPage}`;
		axios.get(api_url)
			.then((res) => {
				let perPage = Number(res.headers['per-page']);
				let total = Number(res.headers['total']);
				let totalPage = perPage > 0 ? Math.ceil(total / perPage) : 0;										
				let pageItems = getPaginationList(page_number, this.state.startPage, this.state.pageItemsCount , 0, totalPage);
				let startPage = pageItems[0];	
				_this.setState({
					products: res.data, 
					perPage: perPage, 
					totalPage: totalPage, 
					total: total, 
					currentPage: page_number,
					pageItems: pageItems,
					startPage: startPage
				});								
			})
			.catch((err) => {
				console.log(err);
			});				
	}

	handleClickLinkToOrder(id){
		console.log(id);
	}

	handleClickPageNumber(num){
		this.fetch(num);
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
		    <SkPagination 
		    	fetch={this.fetch} 
		    	currentPage={this.state.currentPage}
		    	pageItems={this.state.pageItems}
		    	handleClickPageNumber={this.handleClickPageNumber} 
		    	totalPage={this.state.totalPage}/>
	    </div>			
		)
	}
}

export default Products;