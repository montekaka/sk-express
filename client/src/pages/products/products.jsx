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
			pageItemsCount: 10			
		}
	}
	//getPaginationList = (currentPage, start, items, min, max)
	

	render() {
		return (
			<div>
				<Dashheader subtitle={'Overview'} title={'Product'}/>
		    <div className="hr-divider mt-3 mb-5">
		      <h3 className="hr-divider-content hr-divider-heading">Products</h3>		      
		      <p>Total Page: {this.state.totalPage}</p>
		    </div>		    
		    <TablePagination 		    	
		    	base_url={base_url} 
		    	get_url={get_url} 
		    	perPage={this.state.perPage}
		    	pageItemsCount={this.state.pageItemsCount}
		    	tableHeaders={this.props.tableHeaders}/> 		    	
	    </div>			
		)
	}
}

export default Products;