import React from 'react';
import { Link } from 'react-router-dom';
import { Col, Row, Button, Form, FormGroup, Label, Input,FormFeedback, FormText, CustomInput } from 'reactstrap';
import DatePicker from "react-datepicker";
import moment from "moment";
import "react-datepicker/dist/react-datepicker.css";

const OrderForm = (props) => {	

	function handleInputChange(event) {
    console.log(event)
		// const name = event.target.name;
		// const value = event.target.value;
		// props.updateState({name: name, value: value});
	}	

  function handleClick(event) {
    const name = event.target.name;
    const value = event.target.checked;    
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
              <DatePicker
                  name="order_date"                  
                  className="form-control"
                  selected={props.data.order_date}
                  onChange={handleInputChange}
              />                                         
            </Col>
          </FormGroup>  
          <FormGroup row>
            <Label for="exampleDate" md={2} >Delivery date</Label> 
            <Col md={2}>
              <FormGroup check>
                <Label check>
                  <Input name="is_per_item_delivery_date" type="checkbox" id="checkbox2" onClick={handleClick} defaultChecked={props.data.is_per_item_delivery_date} />{' '}
                  Delivery per item
                </Label>
              </FormGroup>                         
            </Col>
            {
              props.data.is_per_item_delivery_date === false && 
              <Col md={4}>
                <div className="input-with-icon">
                  <Input type="date" 
                  name="order_delivery_date" className="form-control" id="exampleDate" placeholder="date placeholder" data-provide="datepicker" value={ props.data.order_delivery_date} onChange={handleInputChange}/>
                  <span className="icon icon-calendar"></span>
                </div>                          
              </Col>                 
            }                                                      
          </FormGroup>   
	      </Form>
	    </div>
    </div>
	)	
};

export default OrderForm;
