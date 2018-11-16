import React from 'react';
import axios from 'axios';
import { Link, Redirect } from 'react-router-dom';
import _ from 'underscore';
import Dashheader from '../../components/dashheader/dashheader.jsx';
import TablePagination from '../../components/shared/table-pagination/table-pagination.jsx';
import config from '../../../../resource/config';


//const tableHeaders = productTable.tableHeaders;
const base_url = config.base_url;

// parse page number from url

class BuyerCompanyProductPickProduct extends React.Component {
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
    if (this.state.toGoback === true) {
        return <Redirect to={this.state.parent_page_url} />
    } 		
    if (this.state.toGoback === true) {
      return <Redirect to={this.state.parent_page_url} />
    }     
		const buyer_company_id = this.props.params.params.buyer_company_id;        
		const parent_path = `${this.props.skState.apis['PARENT_PATH']}/${buyer_company_id}/new/external_product_prices`;
		return (
			<div>
				<Dashheader subtitle={'Overview'} title={'Products'}/>
				<div className="hr-divider mt-3 mb-5">
				  <h3 className="hr-divider-content hr-divider-heading">Products</h3>		      
				  <p>Pick the product you want to add to buyer company</p>
				  <p>Total Products: {this.state.total}</p>
				  <p>Total Page: {this.state.totalPage}</p>
				</div>		    
				<TablePagination 		 
					handleUpdateTotalItems={this.handleUpdateTotalItems}   	
					base_url={base_url}
					parent_path={parent_path}
					handleClickItem={this.handleClickItem} 
					perPage={this.state.perPage}
					pageItemsCount={this.state.pageItemsCount}
					skState={this.props.skState}/> 		    	
			</div>			
		)
	}
}

export default BuyerCompanyProductPickProduct;