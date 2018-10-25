import React from 'react';
import { Redirect } from "react-router-dom";
import axios from 'axios';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import _ from 'underscore';
import Dashheader from './../../components/dashheader/dashheader.jsx';
import config from './../../../../resource/config';
import ProductForm from './productForm.jsx';
import SkModal from './../../components/shared/modal/skModal.jsx';
const base_url = config.base_url;

class ProductNew extends React.Component {
	constructor(props) {		
		super(props);
		this.state = {
			toGoback: false,
			name: '',
			description: '',
			product_code: '',
			price: 0,
			price_category_1_label: '',
			price_category_2_label: '',
			price_category_3_label: '',
			price_category_1_unit: 0,
			price_category_2_unit: 0,
			price_category_3_unit: 0,
			backToPage: '',
			errorModal: false,
			errorMessage: 'Please make sure you fill up the Product name, code and price'
		}
		this.updateState = this.updateState.bind(this);
		this.submit = this.submit.bind(this);
		this.create = this.create.bind(this);
		this.modalToggle = this.modalToggle.bind(this);
	}

	componentDidMount() {
		this.setState({backToPage: this.props.skState.apis['GET']});
	}

	updateState(newState) {
		const name = newState.name;
		const value = newState.value;
		this.setState({[name]: value});
	}

	submit() {		
		if (this.state.name.length === 0 || this.state.product_code.length === 0 || Number(this.state.price) === 0) {
			this.setState({errorModal: true});
			console.log('invalid...');
		} else {
			this.create();
		}
	}

	create() {	
		const _this = this;
		const new_api_base = `${base_url+this.props.skState.apis['NEW']}`;		
		//console.log('create',new_api_base, this.state);
		const data = this.state;
		axios.post(new_api_base, data)
		.then((res) => {
			console.log(res);
			_this.setState({toGoback: true});
			// redirect back
		})
		.catch((err) => {
			console.log(err);
			// show error using the modal..
		})
	}

	modalToggle(){
		const errorModal = !this.state.errorModal;
		this.setState({errorModal: errorModal});
	}

	render() {
		if (this.state.toGoback === true) {
			return <Redirect to='/products' />
		}				
		return (
			<div>
				<SkModal 
					modal={this.state.errorModal} 
					className={'error'} 
					toggle={this.modalToggle}
					modalTitle={'Error'}
					message={this.state.errorMessage}
					closeBtnLabel={'OK'}/>
				<Dashheader subtitle={'Overview'} title={'Product New'}/>
				<ProductForm
					data={this.state}
					backToPage={this.state.backToPage} 
					updateState={this.updateState} 
					create={this.submit}/>
			</div>
		)
	}

}

export default ProductNew;	