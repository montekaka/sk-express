import React from 'react';
import { Link, Redirect } from "react-router-dom";
import Auth from 'j-toker';
import _ from 'underscore';
import Dashheader from './../../components/dashheader/dashheader.jsx';
import TablePagination from './../../components/shared/table-pagination/table-pagination.jsx';
import config from './../../../../resource/config';
import auth from './../../../../resource/libs/helpers/auth.js';
// import orderState from './../../../../resource/orderCollection.js';
// import orderClass from './../../../../resource/libs/helpers/OrderClass.js';
// const OrderClass = orderClass.OrderClass;
// let workingOrder = orderState.workingOrder;

const base_url = config.base_url;
const new_api_base = 'new/order/buyers'

class Orders extends React.Component {
	constructor(props) {		
		super(props);
		this.state = {
			perPage: 8,			
			pageItemsCount: 10,
			totalPage: 0,
      total: 0,
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
		    <Link to={new_api_base} className="btn btn-outline-info product-btn">New order</Link>
		    <TablePagination 		 
		    	handleUpdateTotalItems={this.handleUpdateTotalItems}   	
		    	base_url={base_url}
		    	perPage={this.state.perPage}
		    	pageItemsCount={this.state.pageItemsCount}
		    	skState={this.props.skState}/> 		    	
	    </div>				
		)
	}
}

export default Orders;