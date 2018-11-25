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

class ProductEdit extends React.Component {
	constructor(props) {		
		super(props);
		this.state = {
			id:'',
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
			toGoback: false,
			errorModal: false,
			errorMessage: 'Please make sure you fill up the Product name, code and price'
		}
		this.updateState = this.updateState.bind(this);
		this.submit = this.submit.bind(this);
		this.update = this.update.bind(this);
		this.modalToggle = this.modalToggle.bind(this);
	}

	componentDidMount() {
	  const id = this.props.params.params.id;
	  this.get(id);
	}	

	get(id) {
		const api_base = `${this.props.skState.apis['GET']}`
		this.setState({backToPage: `${api_base}/${id}`});
		const api_url = `${base_url+api_base}/${id}.json`;
		//this.setState({api_base: api_base})
		const _this = this;
		axios.get(api_url)
			.then((res) => {
				_this.setState({id: res.data.id, 
					product_code: res.data.product_code, 
					name: res.data.name, 
					price: res.data.price,
					price_category_1_label: res.data.price_category_1_label,
					price_category_2_label: res.data.price_category_2_label,
					price_category_3_label: res.data.price_category_3_label,
					price_category_1_unit: res.data.price_category_1_unit,
					price_category_2_unit: res.data.price_category_2_unit,
					price_category_3_unit: res.data.price_category_3_unit,					
				});
			})
			.catch((err) => {
				console.log(err);
			})
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
			this.update();
		}
	}

	update() {		
		const new_api_base = `${base_url+this.props.skState.apis['UPDATE']}/${this.state.id}`;		
		const data = {
			id: this.state.id,
			name: this.state.name,
			description: this.state.description,
			product_code: this.state.product_code,
			price: this.state.price,
			price_category_1_label: this.state.price_category_1_label,
			price_category_2_label: this.state.price_category_2_label,
			price_category_3_label: this.state.price_category_3_label,
			price_category_1_unit: this.state.price_category_1_unit,
			price_category_2_unit: this.state.price_category_2_unit,
			price_category_3_unit: this.state.price_category_3_unit,			
		}
		axios.put(new_api_base, data)
		.then((res) => {
			this.setState({goBackToPage: true});
			console.log(res);
			// redirect back
		})
		.catch((err) => {
			console.log('err',err);
			// show error using the modal..
		})
	}

	modalToggle(){
		const errorModal = !this.state.errorModal;
		this.setState({errorModal: errorModal});
	}

	render() {
    if (this.props.isAuthed === false) {
      return <Redirect to={'/'} />
    }  
    if (this.state.toGoback) {
    	return <Redirect to={this.state.goBackToPage} />
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
				<Dashheader subtitle={'Overview'} title={'Product Edit'}/>
				<ProductForm 
					data={this.state}
					updateState={this.updateState} 
					backToPage={this.state.backToPage}
					create={this.submit}/>
			</div>
		)
	}

}

export default ProductEdit;	