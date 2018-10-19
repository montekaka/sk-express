import React from 'react';
import axios from 'axios';
import _ from 'underscore';
import Dashheader from './../../components/dashheader/dashheader.jsx';
import TablePagination from './../../components/shared/table-pagination/table-pagination.jsx';
import config from './../../../../resource/config';


//const tableHeaders = productTable.tableHeaders;
const base_url = config.base_url;
const get_url = '/products.json';


// parse page number from url

class Products extends React.Component {
	constructor(props) {		
		super(props);
		this.state = {
			perPage: 8,			
			pageItemsCount: 10,
			totalPage: 0,
			total: 0
		}
		this.handleUpdateTotalItems = this.handleUpdateTotalItems.bind(this);
	}
	//getPaginationList = (currentPage, start, items, min, max)
	
	handleUpdateTotalItems(totalPage, total) {
		this.setState({totalPage: totalPage, total: total});
	}

	render() {
		return (
			<div>
				<Dashheader subtitle={'Overview'} title={'Product'}/>
		    <div className="hr-divider mt-3 mb-5">
		      <h3 className="hr-divider-content hr-divider-heading">Products</h3>		      
		      <p>Total Products: {this.state.total}</p>
		      <p>Total Page: {this.state.totalPage}</p>
		    </div>		    
		    <TablePagination 		 
		    	handleUpdateTotalItems={this.handleUpdateTotalItems}   	
		    	base_url={base_url} 
		    	get_url={get_url} 
		    	perPage={this.state.perPage}
		    	pageItemsCount={this.state.pageItemsCount}
		    	skState={this.props.skState}/> 		    	
	    </div>			
		)
	}
}

export default Products;