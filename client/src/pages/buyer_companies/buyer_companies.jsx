import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import _ from 'underscore';
import Dashheader from '../../components/dashheader/dashheader.jsx';
import TablePagination from '../../components/shared/table-pagination/table-pagination.jsx';
import config from '../../../../resource/config';


//const tableHeaders = productTable.tableHeaders;
const base_url = config.base_url;

// parse page number from url

class BuyerCompanies extends React.Component {
	constructor(props) {		
		super(props);
		this.state = {
			perPage: 8,			
			pageItemsCount: 10,
			totalPage: 0,
			total: 0			
		}
		this.handleUpdateTotalItems = this.handleUpdateTotalItems.bind(this);
		this.handleClickItem = this.handleClickItem.bind(this);
	}
	//getPaginationList = (currentPage, start, items, min, max)
	
	handleUpdateTotalItems(totalPage, total) {
		this.setState({totalPage: totalPage, total: total});
	}

	handleClickItem(id) {
		console.log(id)
	}

	render() {
		const new_api_base = `new${this.props.skState.apis['NEW']}`;
		return (
			<div>
				<Dashheader subtitle={'Overview'} title={'Buyer Company'}/>
				<Link to={new_api_base} className="btn btn-outline-info product-btn">New</Link>
				<div className="hr-divider mt-3 mb-5">
				  <h3 className="hr-divider-content hr-divider-heading">Buyer Companies</h3>		      
				  <p>Total Company: {this.state.total}</p>
				  <p>Total Page: {this.state.totalPage}</p>
				</div>		    
				<TablePagination 		 
					handleUpdateTotalItems={this.handleUpdateTotalItems}   	
					base_url={base_url}
					handleClickItem={this.handleClickItem} 
					perPage={this.state.perPage}
					pageItemsCount={this.state.pageItemsCount}
					skState={this.props.skState}/> 		    	
			</div>			
		)
	}
}

export default BuyerCompanies;