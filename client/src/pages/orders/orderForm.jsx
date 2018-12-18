import React from 'react';
import _ from 'underscore';
import { Link } from 'react-router-dom';
import { Col, Row, Button, Form, FormGroup, Label, Input,FormFeedback, FormText, CustomInput, InputGroup, InputGroupAddon, InputGroupText } from 'reactstrap';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment';
import {Typeahead} from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';

const terms = ['30 Days', '60 Days', '90 Days', '180 Days'];
const shippingMethods = ['Pick up', '1 Day Delivery', '2 Days Delivery'];
const saleReps = ['Ed', 'Gordon'];

const OrderForm = (props) => {	

  const shipping_address = props.data.shipping_address ? props.data.shipping_address : '';
  const shipping_phone_number = props.data.shipping_phone_number ? props.data.shipping_phone_number : ""
  const fax_number = props.data.fax_number ? props.data.fax_number : "";
  const shipping_method = props.data.shipping_method ? props.data.shipping_method : "";
  const term = props.data.terms ? props.data.terms : "";
  const sales_rep = props.data.sales_rep ? props.data.sales_rep : "";

	function handleInputChange(event) {
		const name = event.target.name;
		const value = event.target.value;
		props.updateState({name: name, value: value});
	}	

  function handleOrderDateChange(event) {
    const name = 'order_date';
    const value = moment(event._d).format(event._f);
    props.updateState({name: name, value: value});
  }

  function handleDeliveryDateChange(event) {
    const name = 'order_delivery_date';
    const value = moment(event._d).format(event._f);
    props.updateState({name: name, value: value});
  }

  function handleClick(event) {
    const name = event.target.name;
    const value = event.target.checked;    
    props.updateState({name: name, value: value});
  }

	function getInputValue(val) {
		return val ? val : '';
	}

  function getShippingListInfo(data, column) {
    let result = [];
    _.each(data, (item) => {
      if(item[column] !== null) {
        result.push(item[column]);
      }
    });
    return result;
  }

  function typeaheadChange(key, event) {
    // let val = getInputValue(event);
    if(event) {
      props.updateState({name: key, value: event});
    }    
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
            <Label for="buyerName" sm={2}>Slot</Label>
            <Col sm={10}>
              <Input type="text" name="slot" id="buyerName" placeholder="Enter the slot numbers" onChange={handleInputChange} value={ getInputValue(props.data.slot)}/>
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
                  showMonthDropdown
                  useShortMonthInDropdown
                  dateFormat="YYYY/MM/DD"
                  selected={moment(props.data.order_date)}
                  onChange={handleOrderDateChange}
              /> 
            </Col>
          </FormGroup>  
          <FormGroup row>
            <Label for="exampleDate" md={2} >Delivery date</Label> 
            <Col md={2}>
              <FormGroup check>
                <Label check>
                  <Input name="is_per_item_delivery_date" type="checkbox" id="checkbox2" onClick={handleClick} defaultChecked={props.data.is_per_item_delivery_date} checked={props.data.is_per_item_delivery_date}/>{' '}
                  Delivery per item
                </Label>
              </FormGroup>                         
            </Col>
            {
              props.data.is_per_item_delivery_date === false && 
              <Col md={4}>
                <DatePicker
                    name="order_delivery_date"                  
                    className="form-control"
                    showMonthDropdown
                    useShortMonthInDropdown
                    dateFormat="YYYY/MM/DD"
                    selected={moment(props.data.order_delivery_date)}
                    onChange={handleDeliveryDateChange}
                />                           
              </Col>                 
            }                                                      
          </FormGroup> 
          <FormGroup row>
            <Label for="exampleDate" md={2} >Shipping address</Label> 
            <Col sm={10}> 
              <Typeahead
                labelKey="shipping_address"
                multiple={false}
                selected={[shipping_address]}
                onChange={(e) => {
                  typeaheadChange('shipping_address', e[0]);
                }}
                onInputChange={(e) => {
                  typeaheadChange('shipping_address', e);
                }}
                options={getShippingListInfo(props.data.shipping_addresses, 'address_1')}
                placeholder="Choose a shipping address..."
              />              
            </Col>
          </FormGroup> 
          <FormGroup row>
            <Label for="exampleDate" md={2} >Phone number</Label> 
            <Col sm={10}> 
              <Typeahead
                labelKey="shipping_phone_number"
                multiple={false}
                onChange={(e) => {
                  typeaheadChange('shipping_phone_number', e[0]);
                }}
                onInputChange={(e) => {
                  typeaheadChange('shipping_phone_number', e);
                }}
                selected={[shipping_phone_number]}
                options={getShippingListInfo(props.data.shipping_addresses, 'phone_number')}
                placeholder="Choose a phone number..."
              />              
            </Col>
          </FormGroup> 
          <FormGroup row>
            <Label for="exampleDate" md={2} >Fax number</Label> 
            <Col sm={10}> 
              <Typeahead
                labelKey="fax_number"
                multiple={false}
                selected={[fax_number]}
                onChange={(e) => {
                  typeaheadChange('fax_number', e[0]);
                }}
                onInputChange={(e) => {
                  typeaheadChange('fax_number', e);
                }}
                options={getShippingListInfo(props.data.shipping_addresses, 'fax_number')}
                placeholder="Choose a fax number..."
              />              
            </Col>
          </FormGroup> 
          <FormGroup row>
            <Label for="exampleDate" md={2} >Shipping method</Label> 
            <Col sm={10}> 
              <Typeahead
                labelKey="shipping_method"
                multiple={false}
                selected={[shipping_method]}
                onChange={(e) => {
                  typeaheadChange('shipping_method', e[0]);
                }}
                onInputChange={(e) => {
                  typeaheadChange('shipping_method', e);
                }}
                options={shippingMethods}
                placeholder="Choose a shipping method..."
              />              
            </Col>
          </FormGroup>  
          <FormGroup row>
            <Label for="exampleDate" md={2} >Term</Label> 
            <Col sm={10}> 
              <Typeahead
                labelKey="terms"                
                multiple={false}
                selected={[term]}
                onChange={(e) => {
                  typeaheadChange('terms', e[0]);
                }}
                onInputChange={(e) => {
                  typeaheadChange('terms', e);
                }}
                options={terms}
                placeholder="Choose a term..."
              />              
            </Col>
          </FormGroup> 
          <FormGroup row>
            <Label for="exampleDate" md={2} >Sale Rep</Label> 
            <Col sm={10}> 
              <Typeahead
                labelKey="sales_rep"                
                multiple={false}
                selected={[sales_rep]}
                onChange={(e) => {
                  typeaheadChange('sales_rep', e[0]);
                }}
                onInputChange={(e) => {
                  typeaheadChange('sales_rep', e);
                }}
                options={saleReps}
                placeholder="Choose a sale rep..."
              />              
            </Col>
          </FormGroup>                      
          <FormGroup row>
            <Label for="exampleDate" md={2} >Total price</Label> 
            <Col sm={10}>
              <InputGroup>
                <InputGroupAddon addonType="prepend"><InputGroupText className="text-white">$</InputGroupText></InputGroupAddon>
                <Input disabled type="number" name="total_price" id="totalPrice" placeholder="Amount" value={ getInputValue(props.data.total_price) } onChange={handleInputChange}/>
              </InputGroup>              
            </Col>
          </FormGroup>                          
	      </Form>
	    </div>
    </div>
	)	
};

export default OrderForm;
