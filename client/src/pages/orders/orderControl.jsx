import React from 'react';

const OrderControl = (props) => {

	function handleAddMore() {
		props.addMore();
	}

	return (
		<div className="card bg-dark text-white">
			<div className="card-body">
				<div className="btn btn-outline-success" onClick={handleAddMore}>Add more item</div>
			</div>
		</div>
	)
}

export default OrderControl;