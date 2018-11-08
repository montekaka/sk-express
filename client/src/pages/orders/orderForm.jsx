import React from 'react';
import { Link } from 'react-router-dom';
import { Col, Row, Button, Form, FormGroup, Label, Input,FormFeedback, FormText } from 'reactstrap';

const OrderForm = (props) => {	

	function handleInputChange(event) {
		const name = event.target.name;
		const value = event.target.value
		props.updateState({name: name, value: value});
	}	

	function getInputValue(val) {
		return val ? val : '';
	}

	return (
    <div className="card bg-dark text-white">
    	<div className="card-body">
	      <Form>
          <FormGroup row>
            <Label for="buyerName" sm={2}>Buyer company name</Label>
            <Col sm={10}>
              <Input disabled type="text" name="buyer_company_name" id="buyerName" placeholder="with a placeholder" onChange={handleInputChange} value={ getInputValue(props.data.buyer_company_name)}/>
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="buyerName" sm={2}>Billing address</Label>
            <Col sm={10}>
              <Input type="text" name="billing_address" id="buyerName" placeholder="with a placeholder" onChange={handleInputChange} value={ getInputValue(props.data.billing_address)}/>
            </Col>
          </FormGroup>          	 
          <FormGroup row>
            <Label for="buyerPhoneNumber" sm={2}>Phone number</Label>
            <Col sm={10}>
              <Input type="text" name="phone_number" id="buyerPhoneNumber" placeholder="with a placeholder" onChange={handleInputChange} value={ getInputValue(props.data.phone_number)}/>
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="buyerEmail" sm={2}>Email</Label>
            <Col sm={10}>
              <Input type="text" name="email" id="buyerEmail" placeholder="with a placeholder" onChange={handleInputChange} value={ getInputValue(props.data.email)}/>
            </Col>
          </FormGroup>	
          <FormGroup row>
            <Label for="exampleDate" sm={2} >Order date</Label>
            <Col sm={10}>
              <div className="input-with-icon">
                <Input type="date" name="order_date" className="form-control" id="exampleDate" placeholder="date placeholder" data-provide="datepicker" value={ props.data.order_date} onChange={handleInputChange}/>
                <span className="icon icon-calendar"></span>
              </div>                          
            </Col>
          </FormGroup>  
          <FormGroup row>
            <Label for="exampleDate" sm={2} >Shipping date</Label>
            <Col sm={10}>
              <div className="input-with-icon">
                <Input type="date" name="order_delivery_date" className="form-control" id="exampleDate" placeholder="date placeholder" data-provide="datepicker" value={ props.data.order_delivery_date} onChange={handleInputChange}/>
                <span className="icon icon-calendar"></span>
              </div>                          
            </Col>
          </FormGroup>                    
	      </Form>
	    </div>
    </div>
	)	
};

export default OrderForm;
