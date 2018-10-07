import React from 'react';
import { Link } from "react-router-dom";
import {Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink} from 'reactstrap';

class FluidNavbar extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			navItems: [],
			collapsed: true
		}
		this.toggleNavbar = this.toggleNavbar.bind(this);
	}

  toggleNavbar() {
    this.setState({
      collapsed: !this.state.collapsed
    });
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
	            <NavLink tag={Link} to="/products">Products</NavLink>
	          </NavItem>
	        </Nav>
	      </Collapse>
	    </Navbar>
		)
	}
}

export default FluidNavbar;