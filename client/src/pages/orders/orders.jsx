import React from 'react';
import { Redirect } from "react-router-dom";
import _ from 'underscore';
import Dashheader from './../../components/dashheader/dashheader.jsx';
import TablePagination from './../../components/shared/table-pagination/table-pagination.jsx';
import config from './../../../../resource/config';

const base_url = config.base_url;
const get_url = '/orders.json';


class Orders extends React.Component {
	constructor(props) {		
		super(props);
		this.state = {
			perPage: 8,			
			pageItemsCount: 10,
			totalPage: 0,
      total: 0,
      isAuthed: false,
			hasPermission: false
		}
		this.handleClickLinkToOrder = this.handleClickLinkToOrder.bind(this);
		this.handleUpdateTotalItems = this.handleUpdateTotalItems.bind(this);
  }

	handleUpdateTotalItems(totalPage, total) {
		this.setState({totalPage: totalPage, total: total});
	}

	handleClickLinkToOrder(id){
		console.log(id);
	}

	render() {
    if (this.props.isAuthed === false) {
      return <Redirect to={'/'} />
    }	    
		return (
			<div>
				<Dashheader subtitle={'Overview'} title={'Order'}/>
		    <div className="hr-divider mt-3 mb-5">
		      <h3 className="hr-divider-content hr-divider-heading">Orders</h3>		      
		      <p>Total Orders: {this.state.total}</p>
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

export default Orders;