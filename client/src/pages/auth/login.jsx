import React from 'react';
import PropTypes from 'prop-types';

class Login extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			email: '',
			passowrd: ''
		}
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange(event) {
		var name = event.target.name;
		var value = event.target.value;
		this.setState({[name]: value});
	}

	handleSubmit(event) {
		console.log(this.state.email, this.state.passowrd);
		event.preventDefault();
	}

	render() {

		return (
			<form className="form-signin" onSubmit={this.handleSubmit}>
				<div className="text-center mb-4">
					<img className="mb-4" src="https://themes.getbootstrap.com/wp-content/themes/bootstrap-marketplace/assets/images/elements/bootstrap-stack.png" alt="" width="72" height="72" />
					<h1 className="h3 mb-3 font-weight-normal">Floating labels</h1>
					<p>Build form controls with floating labels via the <code>:placeholder-shown</code> pseudo-element. <a href="https://caniuse.com/#feat=css-placeholder-shown">Works in latest Chrome, Safari, and Firefox.</a></p>
				</div>
				<div className="form-label-group">
	        <input type="email" name="email" id="inputEmail" className="form-control" placeholder="Email address" onChange={this.handleChange} required />
	        <label htmlFor="inputEmail">Email address</label>
	      </div>

	      <div className="form-label-group">
	        <input type="password" name="password" id="inputPassword" className="form-control" placeholder="Password" onChange={this.handleChange} required />
	        <label htmlFor="inputPassword">Password</label>
	      </div>

	      <button className="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
	      <p className="mt-5 mb-3 text-muted text-center">&copy; 2018</p>				
			</form>
		)
	}
}

export default Login;