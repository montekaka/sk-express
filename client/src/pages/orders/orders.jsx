import React from 'react';
import axios from 'axios';
import SkTable from './../../components/shared/table/skTable.jsx';
import orderTable from './../../../../resource/orderTable';
import Dashheader from './../../components/dashheader/dashheader.jsx';
import config from './../../../../resource/config';

const tableHeaders = orderTable.tableHeaders;
const base_url = config.base_url;
const get_url = '/orders.json';


class Orders extends React.Component {
	constructor(props) {		
		super(props);
		this.state = {
			orders: [],
			hasPermission: false
		}
		this.handleClickLinkToOrder = this.handleClickLinkToOrder.bind(this);
		this.renderSkTable = this.renderSkTable.bind(this);
	}

	componentDidMount() {
		const _this = this;
		const api_url = base_url+get_url;
		//console.log('from order components',this.props.isAuthed)
		axios.get(api_url)
			.then((res) => {
				if(res.data.message !== 'AccessDenied, please check your permission'){
					_this.setState({orders: res.data, hasPermission: true})
				}				
			})
			.catch((err) => {
				//console.log(err);
			});			
	}

	handleClickLinkToOrder(id){
		console.log(id);
	}

	renderSkTable() {
		if(this.state.hasPermission === true && this.props.isAuthed === true) {
			return (
				<SkTable headerItems={tableHeaders} items={this.state.orders} objectName="orders" handleView={this.handleClickLinkToOrder}/>
			)
		} else {
			// redirect back to login
			return (<div>Please sign in</div>);
		}
	}

	render() {
		return (
			<div>
				<Dashheader subtitle={'Overview'} title={'Orders'}/>
		    <div className="hr-divider mt-3 mb-5">
		    	<h3 className="hr-divider-content hr-divider-heading">Orders</h3>		      	      
		    </div>		    		      
		    {this.renderSkTable()}		    
	    </div>			
		)
	}
}

export default Orders;