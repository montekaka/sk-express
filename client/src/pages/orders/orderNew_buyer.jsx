import React from 'react';
import { Link, Redirect } from "react-router-dom";
import Dashheader from './../../components/dashheader/dashheader.jsx';
import TablePagination from './../../components/shared/table-pagination/table-pagination.jsx';
import config from './../../../../resource/config';

const base_url = config.base_url;
const orderingPage = '/new/order/buyers/';

class OrderNewBuyer extends React.Component {
  constructor(props) {    
    super(props);
		this.state = {
			perPage: 8,			
			pageItemsCount: 10,
			totalPage: 0,
      total: 0,
			hasPermission: false,
			toOrderPagePath: '',
			toOrder: false
		}

    this.handleUpdateTotalItems = this.handleUpdateTotalItems.bind(this);
    this.handleSelectClick = this.handleSelectClick.bind(this);
  }

	handleUpdateTotalItems(totalPage, total) {
		this.setState({totalPage: totalPage, total: total});
	}

	handleSelectClick(buyer){
		this.setState({toOrderPagePath: orderingPage+buyer.id, toOrder: true});
	}

  render() {
    if (this.props.isAuthed === false) {
      return <Redirect to={'/'} />
    }	    
    if (this.state.toOrder === true) {
      return <Redirect to={this.state.toOrderPagePath} />
    }	 
  	return (
			<div>
				<Dashheader subtitle={'Overview'} title={'Buyer'}/>
		    <div className="hr-divider mt-3 mb-5">
		      <h3 className="hr-divider-content hr-divider-heading">Select buyer for the new order</h3>		      
		      <p>Total Buyers: {this.state.total}</p>
		      <p>Total Page: {this.state.totalPage}</p>
		    </div>		 		    
		    <TablePagination 		 
		    	handleUpdateTotalItems={this.handleUpdateTotalItems}   	
		    	base_url={base_url}
		    	perPage={this.state.perPage}
		    	pageItemsCount={this.state.pageItemsCount}
		    	handleClickItem={this.handleSelectClick}
		    	skState={this.props.skState}/> 		    	
	    </div>	
  	)    
  }
}

export default OrderNewBuyer;