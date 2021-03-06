import React from 'react';
import { Redirect } from "react-router-dom";
import PropTypes from 'prop-types';
import auth from './../../../../resource/libs/helpers/auth.js';
import Orders from './../orders/orders.jsx'

class Login extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			email: '',
			passowrd: ''
		}
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleEnterKeyDown = this.handleEnterKeyDown.bind(this);
	}

	handleChange(event) {
		var name = event.target.name;
		var value = event.target.value;
		this.setState({[name]: value});
	}

	handleSubmit(event) {
  	var user = this.state;
  	auth.signIn(user, this.props.handleUserState);		
		event.preventDefault();
	}

	handleEnterKeyDown(event) {
		if(event.keyCode === 13 && event.shiftKey === false) {
	  	var user = this.state;
	  	auth.signIn(user, this.props.handleUserState);			
			event.preventDefault();
		}
	}

	render() {
		if (this.props.isAuthed === true) {
			return <Redirect to='/orders' render={(props) => <Orders isAuthed={true}/>} />
		}
		return (
			<form className="form-signin" onSubmit={this.handleSubmit}>
				<div className="text-center mb-4">
					<img className="mb-4" src="https://themes.getbootstrap.com/wp-content/themes/bootstrap-marketplace/assets/images/elements/bootstrap-stack.png" alt="" width="72" height="72" />
					<h1 className="h3 mb-3 font-weight-normal">Gobo</h1>
					<p>Welcome to Gobo CMS</p>
				</div>
				<div className="form-label-group">
	        <input type="email" name="email" id="inputEmail" className="form-control" placeholder="Email address" onChange={this.handleChange} required />
	        <label htmlFor="inputEmail" id="inputEmailLabel">Email address</label>
	      </div>
	      <div className="form-label-group">
	        <input 
	        	type="password" 
	        	name="password" 
	        	id="inputPassword" 
	        	className="form-control" 
	        	placeholder="Password" 
	        	onChange={this.handleChange} 
	        	onKeyDown={this.handleEnterKeyDown}
	        	required />
	        <label htmlFor="inputPassword" id="inputPasswordLabel">Password</label>
	      </div>
	      <button className="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
	      <p className="mt-5 mb-3 text-muted text-center">&copy; 2019</p>				
			</form>
		)
	}
}

export default Login;