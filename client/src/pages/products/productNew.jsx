import React from 'react';
import { Redirect } from "react-router-dom";
import axios from 'axios';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import _ from 'underscore';
import Dashheader from './../../components/dashheader/dashheader.jsx';
import config from './../../../../resource/config';
import ProductForm from './productForm.jsx';
const base_url = config.base_url;

class ProductNew extends React.Component {
	constructor(props) {		
		super(props);

	}

	render() {
		return (
			<div>
				<Dashheader subtitle={'Overview'} title={'Product New'}/>
				<ProductForm/>
			</div>
		)
	}

}

export default ProductNew;	