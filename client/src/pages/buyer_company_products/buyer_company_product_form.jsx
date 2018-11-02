import React from 'react';
import { Link } from 'react-router-dom';
import { Col, Row, Button, Form, FormGroup, Label, Input,FormFeedback, FormText } from 'reactstrap';

const BuyerCompanyProductForm = (props) => {	

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
        <Row>
	      		<Col md={2}>
	      			<FormGroup>
	      				<Label for="internal_product_code">Product code</Label>
	      				<Input disabled type="text" name="internal_product_code" id="internal_product_code" placeholder="with a placeholder" onChange={handleInputChange} value={ getInputValue(props.data.internal_product_code)}/>
	      			</FormGroup>
	      		</Col>
	      		<Col md={10}>
	      			<FormGroup>
	      				<Label for="internal_product_name">Product name</Label>
	      				<Input disabled type="text" name="internal_product_name" id="internal_product_name" placeholder="with a placeholder" onChange={handleInputChange} value={ getInputValue(props.data.internal_product_name)}/>
	      			</FormGroup>
	      		</Col>            
	      	</Row>          
	      	<Row>
	      		<Col md={2}>
	      			<FormGroup>
	      				<Label for="external_code">External product code</Label>
	      				<Input type="text" name="external_code" id="external_code" placeholder="with a placeholder" onChange={handleInputChange} value={ getInputValue(props.data.external_code)}/>
	      			</FormGroup>
	      		</Col>
	      		<Col md={10}>
              <FormGroup>
    				    <Label for="external_name">External product name</Label>
    				    <Input type="text" name="external_name" id="external_name" placeholder="with a placeholder" onChange={handleInputChange} value={ getInputValue(props.data.external_name)}/>
    			    </FormGroup>	             
	      		</Col>            
	      	</Row>
          <FormGroup>
            <Label for="external_price">External product price</Label>
            <Input type="number" name="external_price" id="external_price" placeholder="with a placeholder" onChange={handleInputChange} value={ getInputValue(props.data.external_price)}/>
	      	</FormGroup>     	
          <div>
	      		<Link to={props.backToPage} className="btn btn-outline-info product-btn" >Back</Link>
	      		<div className="btn btn-outline-success" onClick={sumbit}>Submit</div>	      	          	
          </div>
	      </Form>
	    </div>
    </div>
	)	
};

export default BuyerCompanyProductForm;