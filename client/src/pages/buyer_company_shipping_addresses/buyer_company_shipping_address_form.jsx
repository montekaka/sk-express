import React from 'react';
import { Link } from 'react-router-dom';
import { Col, Row, Button, Form, FormGroup, Label, Input,FormFeedback, FormText } from 'reactstrap';

const BuyerCompanyShippingAddressForm = (props) => {	

	function handleInputChange(event) {
		const name = event.target.name;
		const value = event.target.value
		props.updateState({name: name, value: value});
	}	

	function sumbit() {
		props.create();
	}

	function getInputValue(val) {
		return val ? val : '';
	}


	return (
    <div className="card bg-dark text-white">
    	<div className="card-body">
	      <Form>
          <FormGroup>
            <Label for="shippingAddress">Shipping address</Label>
            <Input type="text" name="address_1" id="shippingAddress" placeholder="with a placeholder" onChange={handleInputChange} value={ getInputValue(props.data.address_1)}/>
          </FormGroup>	 
          <FormGroup>
            <Label for="phoneNumber">Phone number</Label>
            <Input type="text" name="phone_number" id="phoneNumber" placeholder="with a placeholder" onChange={handleInputChange} value={ getInputValue(props.data.phone_number)}/>
          </FormGroup>
          <FormGroup>
            <Label for="faxNumber">Fax number</Label>
            <Input type="text" name="fax_number" id="faxNumber" placeholder="with a placeholder" onChange={handleInputChange} value={ getInputValue(props.data.fax_number)}/>
          </FormGroup>					                           	      
	      	<Link to={props.backToPage} className="btn btn-outline-info product-btn" >Back</Link>
	      	<div className="btn btn-outline-success" onClick={sumbit}>Submit</div>	      	
	      </Form>
	    </div>
    </div>
	)	
};

export default BuyerCompanyShippingAddressForm;