import React from 'react';
import { Link } from "react-router-dom";
import {Collapse, Navbar, NavbarToggler,
	NavbarBrand, Nav, NavItem, NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem	
} from 'reactstrap';
import Login from './../../pages/auth/login.jsx'
//import $ from 'jquery';
// import Auth from 'j-toker';
//import config from './../../../../resource/config';
//const base_url = config.base_url;

// $.auth.configure({
//   apiUrl: base_url
// });

import auth from './../../../../resource/libs/helpers/auth.js'

class FluidNavbar extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			navItems: [],
			collapsed: true
		}
		this.toggleNavbar = this.toggleNavbar.bind(this);
		this.hanldeSignInClick = this.hanldeSignInClick.bind(this);
		this.handleSignOutClick = this.handleSignOutClick.bind(this);
		this.loginButton = this.loginButton.bind(this);
	}

  toggleNavbar() {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }	

  hanldeSignInClick() {
  	const user = {email: 'a@a.com', password: 11111111}
  	auth.signIn(user, this.props.handleUserState);
  }

  handleSignOutClick() {
  	auth.signOut(this.props.handleUserState);
  }

  loginButton() {
  	const isLoggedIn = this.props.isAuthed;
  	let button;
  	if (isLoggedIn) {
  		button = <NavLink onClick={this.handleSignOutClick}>Sign out</NavLink>;
  	} else {
  		button = <NavLink tag={Link} to="/login">Login</NavLink>
  	}
  	return button;
  }
  
	render() {
		return (
	    <Navbar className="navbar navbar-expand-sm fixed-top navbar-dark bg-dark app-navbar">	      
	  		<NavbarBrand className="navbar-brand" tag={Link} to="/">
	  			<span className="icon icon-leaf navbar-brand-icon"></span>Dashboard
	  		</NavbarBrand>
	      <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
	      <Collapse isOpen={!this.state.collapsed} navbar>
	        <Nav navbar>
	          <NavItem>
	            <NavLink tag={Link} to="/orders">Orders</NavLink>	            
	          </NavItem>
	          <NavItem>
	          	<NavLink tag={Link} to="/delivery_notes">Delivery notes</NavLink>
	          </NavItem>
						<UncontrolledDropdown nav inNavbar>
							<DropdownToggle nav caret>Resource</DropdownToggle>
							<DropdownMenu right>
								<DropdownItem tag={Link} to="/products">
									Products
								</DropdownItem>
								<DropdownItem tag={Link} to="/buyer_companies">
									Buyer companies
								</DropdownItem>	
								<DropdownItem tag={Link} to="/buyers">
								  Buyers
								</DropdownItem>																
							</DropdownMenu>
						</UncontrolledDropdown>											
	          <NavItem>
	          	{this.loginButton()}
	          </NavItem>	          
	        </Nav>
	      </Collapse>
	    </Navbar>
		)
	}
}

export default FluidNavbar;