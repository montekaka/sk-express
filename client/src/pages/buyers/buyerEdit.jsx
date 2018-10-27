import React from 'react';
import { Redirect } from "react-router-dom";
import axios from 'axios';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import _ from 'underscore';
import Dashheader from '../../components/dashheader/dashheader.jsx';
import config from '../../../../resource/config';
import BuyerForm from './buyerForm.jsx';
import SkModal from '../../components/shared/modal/skModal.jsx';
const base_url = config.base_url;

class BuyerEdit extends React.Component {
	constructor(props) {		
		super(props);
		this.state = {
			id:'',
      name: null,
      email: null,
      phone_number: null,
      buyer_company_name: '',
      buyer_company_id: null,
			backToPage: '',
			errorModal: false,
			errorMessage: 'Please make sure you fill up the name, phone number and email'
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
          email: res.data.email,
          phone_number: res.data.phone_number,
          buyer_company_name: res.data.buyer_company_name,
          buyer_company_id: res.data.buyer_company_id
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
			phone_number: this.state.phone_number,		
      email: this.state.email,
      buyer_company_id: this.state.buyer_company_id
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
		return (
			<div>
				<SkModal 
					modal={this.state.errorModal} 
					className={'error'} 
					toggle={this.modalToggle}
					modalTitle={'Error'}
					message={this.state.errorMessage}
					closeBtnLabel={'OK'}/>
				<Dashheader subtitle={'Overview'} title={'Buyer Edit'}/>
				<BuyerForm 
					data={this.state}
					updateState={this.updateState} 
					backToPage={this.state.backToPage}
					create={this.submit}/>
			</div>
		)
	}

}

export default BuyerEdit;	