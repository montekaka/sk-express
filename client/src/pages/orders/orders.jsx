import React from 'react';
import axios from 'axios';
import SkTable from './../../components/shared/table/skTable.jsx';
import orderTable from './../../../../resource/orderTable';
import config from './../../../../resource/config';

const tableHeaders = orderTable.tableHeaders;
const base_url = config.base_url;

class Orders extends React.Component {
	constructor(props) {		
		super(props);
		this.state = {
			orders: []
		}
		this.handleClickLinkToOrder = this.handleClickLinkToOrder.bind(this);
	}

	componentDidMount() {
		const _this = this;
		const api_url = base_url+'/orders.json';
		axios.get(api_url)
			.then((res) => {
				_this.setState({orders: res.data})
			})
			.catch((err) => {
				console.log(err);
			});			
	}		


	handleClickLinkToOrder(id){
		console.log(id);
	}

	render() {
		return (
			<div>
		    <div className="hr-divider mt-3 mb-5">
		      <h3 className="hr-divider-content hr-divider-heading">Orders</h3>
		      <SkTable headerItems={tableHeaders} items={this.state.orders} objectName="orders" handleView={this.handleClickLinkToOrder}/>
		    </div>		    
	    </div>			
		)
	}
}

export default Orders;