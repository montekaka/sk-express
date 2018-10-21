import React from 'react';
import axios from 'axios';
import _ from 'underscore';
import Dashheader from './../../components/dashheader/dashheader.jsx';

class Product extends React.Component {
	constructor(props) {		
		super(props);
	}

	render() {
		return (
			<div>
				<Dashheader subtitle={'Overview'} title={'Product'}/>
		    <div className="hr-divider mt-3 mb-5">
		      <h3 className="hr-divider-content hr-divider-heading">Product</h3>		      
		    </div>		    	    	
	    </div>			
		)
	}	

}

export default Product;