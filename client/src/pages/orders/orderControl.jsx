import React from 'react';
import { Link } from 'react-router-dom';

const OrderControl = (props) => {

	function handleAddMore() {
		props.addMore();
	}

	function submit() {
		props.submit();
	}

	return (
		<div className="card bg-dark text-white">
			<div className="card-body">
				<div className="btn btn-outline-success" onClick={handleAddMore}>Add more item</div>
				<div className="btn btn-primary float-right" onClick={submit}>Submit</div>
				<Link to={props.backToPage} className="btn btn-outline-info product-btn" >Back</Link>
			</div>
		</div>
	)
}

export default OrderControl;