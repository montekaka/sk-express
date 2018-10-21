import React from 'react';
import { Col, Row, Button, Form, FormGroup, Label, Input,FormFeedback, FormText } from 'reactstrap';

class ProductForm extends React.Component {
	constructor(props) {		
		super(props);
		this.state = {
		}
	}

	render() {
		return (
	    <div className="card">
	    	<div className="card-body">
		      <Form>
		      	<Row>
		      		<Col md={6}>
				      	<FormGroup>
				      		<Label for="productName">Product name</Label>
			          	<Input type="text" name="productName" id="productName" placeholder="with a placeholder" />	      		
				      	</FormGroup>			      	      	
				     	</Col>
		      		<Col md={6}>
				      	<FormGroup>
				      		<Label for="productCode">Product code</Label>
			          	<Input type="text" name="productCode" id="productCode" placeholder="with a placeholder"/>	      		
				      	</FormGroup>	      	
				     	</Col>			     	
		      	</Row>
		      	<FormGroup>
		      		<Label for="productDescription">Product description</Label>
	          	<Input type="text" name="productDescription" id="productDescription" placeholder="with a placeholder" />	      		
		      	</FormGroup>     		      	
		      	<Row>
		      		<Col md={4}>
				      	<FormGroup>
				      		<Label for="categoryType1">Category Type 1</Label>
			          	<Input type="text" name="categoryType1" id="categoryType1" placeholder="e.g. Roll" />	      		
				      	</FormGroup>	      	
				     	</Col>
		      		<Col md={4}>
				      	<FormGroup>
				      		<Label for="unit1">Unit 1</Label>
			          	<Input type="number" name="unit1" id="unit1" placeholder="e.g. 1"/>	      		
				      	</FormGroup>	      	
				     	</Col>	
		      		<Col md={4}>
				      	<FormGroup>
				      		<Label for="price1">Price 1</Label>
			          	<Input type="number" name="price1" id="price1" placeholder="e.g. $12"/>	      		
				      	</FormGroup>	      	
				     	</Col>				     			     	
		      	</Row>	
		      	<Row>
		      		<Col md={4}>
				      	<FormGroup>
				      		<Label for="categoryType2">Category Type 2</Label>
			          	<Input type="text" name="categoryType2" id="categoryType2" placeholder="e.g. Box" />	      		
				      	</FormGroup>	      	
				     	</Col>
		      		<Col md={4}>
				      	<FormGroup>
				      		<Label for="unit2">Unit 2</Label>
			          	<Input type="number" name="unit2" id="unit2" placeholder="e.g. 100"/>	      		
				      	</FormGroup>	      	
				     	</Col>	
		      		<Col md={4}>
				      	<FormGroup>
				      		<Label for="price2">Price 2</Label>
			          	<Input type="number" name="price2" id="price2" placeholder="e.g. $1200"/>	      		
				      	</FormGroup>	      	
				     	</Col>				     			     	
		      	</Row>	
		      	<Row>
		      		<Col md={4}>
				      	<FormGroup>
				      		<Label for="categoryType3">Category Type 3</Label>
			          	<Input type="text" name="categoryType3" id="categoryType3" placeholder="e.g. Pallet" />	      		
				      	</FormGroup>	      	
				     	</Col>
		      		<Col md={4}>
				      	<FormGroup>
				      		<Label for="unit3">Unit 3</Label>
			          	<Input type="number" name="unit3" id="unit3" placeholder="e.g. 1000"/>	      		
				      	</FormGroup>	      	
				     	</Col>	
		      		<Col md={4}>
				      	<FormGroup>
				      		<Label for="price3">Price 3</Label>
			          	<Input type="number" name="price3" id="price3" placeholder="e.g. $12000"/>	      		
				      	</FormGroup>	      	
				     	</Col>				     			     	
		      	</Row>	
		      	<div className="btn btn-outline-success">Submit</div>
		      </Form>
		    </div>
	    </div>
		)
	}
};

export default ProductForm;