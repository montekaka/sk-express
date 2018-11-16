import React from 'react';
import { Redirect } from "react-router-dom";
import axios from 'axios';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import _ from 'underscore';
import Dashheader from '../../components/dashheader/dashheader.jsx';
import config from '../../../../resource/config';
import BuyerCompanyForm from './buyer_companyForm.jsx';
import SkModal from '../../components/shared/modal/skModal.jsx';
const base_url = config.base_url;

class ProductEdit extends React.Component {
	constructor(props) {		
		super(props);
		this.state = {
			id:'',
			name: '',
			description: '',
			billing_address: '',
			backToPage: '',
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
					name: res.data.name, 		
					billing_address: res.data.billing_address,
					description: res.data.description
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
		if (this.state.name.length === 0 ) {
			this.setState({errorModal: true});
			console.log('invalid...');
		} else {
			this.update();
		}
	}

	update() {		
		const new_api_base = `${base_url+this.props.skState.apis['UPDATE']}/${this.state.id}.json`;		
		const data = {
			id: this.state.id,
			name: this.state.name,
			description: this.state.description,		
			billing_address: this.state.billing_address
		}
		axios.put(new_api_base, data)
		.then((res) => {
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
		return (
			<div>
				<SkModal 
					modal={this.state.errorModal} 
					className={'error'} 
					toggle={this.modalToggle}
					modalTitle={'Error'}
					message={this.state.errorMessage}
					closeBtnLabel={'OK'}/>
				<Dashheader subtitle={'Overview'} title={'Buyer company Edit'}/>
				<BuyerCompanyForm 
					data={this.state}
					updateState={this.updateState} 
					backToPage={this.state.backToPage}
					create={this.submit}/>
			</div>
		)
	}

}

export default ProductEdit;	