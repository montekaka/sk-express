import React from 'react';
import axios from 'axios';
import { Link, Redirect } from 'react-router-dom';
import _ from 'underscore';
import Dashheader from '../../components/dashheader/dashheader.jsx';
import TablePagination from '../../components/shared/table-pagination/table-pagination.jsx';
import BuyersHeader from './buyersHeader.jsx';
import config from '../../../../resource/config';

//const tableHeaders = productTable.tableHeaders;
const base_url = config.base_url;

// parse page number from url

class Buyers extends React.Component {
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
    if (this.props.isAuthed === false) {
      return <Redirect to={'/'} />
    }

    let api_base_url = this.props.base_url ? this.props.base_url : base_url;
    let headerComponent = '';
    if (this.props.base_url) {
    	const new_api_base = `/new/buyer_companies/${this.props.parent_id}/buyers`
    	headerComponent = <Link to={new_api_base} className="btn btn-sm btn-outline-info product-btn">Add buyer</Link>
    } else {
    	headerComponent = <BuyersHeader total={this.state.total} totalPage={this.state.totalPage}/>
    }
		return (
			<div>
				{ headerComponent }
				<TablePagination 		 
					handleUpdateTotalItems={this.handleUpdateTotalItems}   	
					base_url={api_base_url}
					handleClickItem={this.handleClickItem} 
					perPage={this.state.perPage}
					parent_path={this.props.parent_path}
					pageItemsCount={this.state.pageItemsCount}
					skState={this.props.skState}/>
			</div>			
		)
	}
}

export default Buyers;