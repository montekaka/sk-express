import React from 'react';
import { Link } from 'react-router-dom';
import { Col, Row, Button, Form, FormGroup, Label, Input,FormFeedback, FormText } from 'reactstrap';

const BuyerForm = (props) => {	

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
            <Label for="buyerName">Buyer name</Label>
            <Input type="text" name="name" id="buyerName" placeholder="with a placeholder" onChange={handleInputChange} value={ getInputValue(props.data.name)}/>
          </FormGroup>	 
          <FormGroup>
            <Label for="buyerPhoneNumber">Phone number</Label>
            <Input type="text" name="phone_number" id="buyerPhoneNumber" placeholder="with a placeholder" onChange={handleInputChange} value={ getInputValue(props.data.phone_number)}/>
          </FormGroup>
          <FormGroup>
            <Label for="buyerEmail">Email</Label>
            <Input type="text" name="email" id="buyerEmail" placeholder="with a placeholder" onChange={handleInputChange} value={ getInputValue(props.data.email)}/>
          </FormGroup>					                           	      
	      	<Link to={props.backToPage} className="btn btn-outline-info product-btn" >Back</Link>
	      	<div className="btn btn-outline-success" onClick={sumbit}>Submit</div>	      	
	      </Form>
	    </div>
    </div>
	)	
};

export default BuyerForm;