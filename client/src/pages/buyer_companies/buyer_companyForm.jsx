import React from 'react';
import { Link } from 'react-router-dom';
import { Col, Row, Button, Form, FormGroup, Label, Input,FormFeedback, FormText } from 'reactstrap';

const BuyerCompanyForm = (props) => {	

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
            <Label for="companyName">Company name</Label>
            <Input type="text" name="name" id="companyName" placeholder="with a placeholder" onChange={handleInputChange} value={ getInputValue(props.data.name)}/>
          </FormGroup>	 
          <FormGroup>
            <Label for="companyBillingAddress">Billing address</Label>
            <Input type="text" name="billing_address" id="companyBillingAddress" placeholder="with a placeholder" onChange={handleInputChange} value={ getInputValue(props.data.billing_address)}/>
          </FormGroup>
          <FormGroup>
            <Label for="companyDescription">Description</Label>
            <Input type="text" name="description" id="companyDescription" placeholder="with a placeholder" onChange={handleInputChange} value={ getInputValue(props.data.description)}/>
          </FormGroup>                             	      
	      	<Link to={props.backToPage} className="btn btn-outline-info product-btn" >Back</Link>
	      	<div className="btn btn-outline-success" onClick={sumbit}>Submit</div>	      	
	      </Form>
	    </div>
    </div>
	)	
};

export default BuyerCompanyForm;