import React from 'react';
import { Col, Row, Button, Form, FormGroup, Label, Input,FormFeedback, FormText } from 'reactstrap';

const ProductForm = (props) => {	

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
	      		<Col md={8}>
			      	<FormGroup>
			      		<Label for="productName">Product name</Label>
		          	<Input type="text" name="name" id="productName" placeholder="with a placeholder" onChange={handleInputChange} value={ getInputValue(props.data.name)}/>
			      	</FormGroup>			      	      	
			     	</Col>
	      		<Col md={2}>
			      	<FormGroup>
			      		<Label for="productCode">Product code</Label>
		          	<Input type="text" name="product_code" id="productCode" placeholder="with a placeholder" onChange={handleInputChange} value={ getInputValue(props.data.product_code)}/>
			      	</FormGroup>	      	
			     	</Col>	
	      		<Col md={2}>
			      	<FormGroup>
			      		<Label for="price">Price</Label>
		          	<Input type="number" name="price" id="price" placeholder="with a placeholder" onChange={handleInputChange} value={ getInputValue(props.data.price)}/>
			      	</FormGroup>	      	
			     	</Col>				     			     	
	      	</Row>
	      	<FormGroup>
	      		<Label for="productDescription">Product description</Label>
          	<Input type="text" name="description" id="productDescription" placeholder="with a placeholder" onChange={handleInputChange} value={ getInputValue(props.data.description)}/>
	      	</FormGroup>     		      	
	      	<Row>
	      		<Col md={6}>
			      	<FormGroup>
			      		<Label for="categoryType1">Category Type 1</Label>
		          	<Input type="text" name="price_category_1_label" id="categoryType1" placeholder="e.g. Roll" onChange={handleInputChange} value={ getInputValue(props.data.price_category_1_label)}/>
			      	</FormGroup>	      	
			     	</Col>
	      		<Col md={6}>
			      	<FormGroup>
			      		<Label for="unit1">Unit 1</Label>
		          	<Input type="number" name="price_category_1_unit" id="unit1" placeholder="e.g. 1" onChange={handleInputChange} value={ getInputValue(props.data.price_category_1_unit)}/>
			      	</FormGroup>	      	
			     	</Col>					     			     	
	      	</Row>	
	      	<Row>
	      		<Col md={6}>
			      	<FormGroup>
			      		<Label for="categoryType2">Category Type 2</Label>
		          	<Input type="text" name="price_category_2_label" id="categoryType2" placeholder="e.g. Box" onChange={handleInputChange} value={ getInputValue(props.data.price_category_2_label)}/>
			      	</FormGroup>	      	
			     	</Col>
	      		<Col md={6}>
			      	<FormGroup>
			      		<Label for="unit2">Unit 2</Label>
		          	<Input type="number" name="price_category_2_unit" id="unit2" placeholder="e.g. 100" onChange={handleInputChange} value={ getInputValue(props.data.price_category_2_unit)}/>
			      	</FormGroup>	      	
			     	</Col>				     			     	
	      	</Row>	
	      	<Row>
	      		<Col md={6}>
			      	<FormGroup>
			      		<Label for="categoryType3">Category Type 3</Label>
		          	<Input type="text" name="price_category_3_label" id="categoryType3" placeholder="e.g. Pallet" onChange={handleInputChange} value={ getInputValue(props.data.price_category_3_label)}/>
			      	</FormGroup>	      	
			     	</Col>
	      		<Col md={6}>
			      	<FormGroup>
			      		<Label for="unit3">Unit 3</Label>
		          	<Input type="number" name="price_category_3_unit" id="unit3" placeholder="e.g. 1000" onChange={handleInputChange} value={ getInputValue(props.data.price_category_3_unit)}/>
			      	</FormGroup>	      	
			     	</Col>			     			     	
	      	</Row>	
	      	<div className="btn btn-outline-success" onClick={sumbit}>Submit</div>
	      </Form>
	    </div>
    </div>
	)	
};

export default ProductForm;