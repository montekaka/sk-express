import React from 'react';
import Dashheader from '../../components/dashheader/dashheader.jsx';

const BuyersHeader = (props) => {
	return (
		<div>
			<Dashheader subtitle={'Overview'} title={'Buyers'} />
			<div className="hr-divider mt-3 mb-5">
			  <h3 className="hr-divider-content hr-divider-heading">Buyers</h3>		      
			  <p>Total Buyers: {props.total}</p>
			  <p>Total Page: {props.totalPage}</p>
			</div>
		</div>		
	)
};

export default BuyersHeader;