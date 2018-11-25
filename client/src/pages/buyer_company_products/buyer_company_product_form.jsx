import React from 'react';
import _ from 'underscore';
import { Link } from 'react-router-dom';
import { Col, Row, Button, Form, FormGroup, Label, Input,FormFeedback, FormText ,InputGroup, InputGroupAddon, InputGroupText, } from 'reactstrap';
import SkInputSelect from './../../components/shared/input-selection/input-selection.jsx'

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
  
  function handleSelect(target) {
    const selectedValue = target.value;
    const result = _.filter(props.data.internal_price_category_list, (item) => {
      return item['label'] === selectedValue;
    });
    const label = result[0]['label'];
    const unit = result[0]['unit'];
    switch(target.name) {
      case 'external_purchase_price_category_label':
        props.updateState({name: 'external_purchase_price_category_label', value: label});
        props.updateState({name: 'external_purchase_price_category_unit', value: unit});
        break;
      case 'external_contract_price_category_label':
        props.updateState({name: 'external_contract_price_category_label', value: label});
        props.updateState({name: 'external_contract_price_category_unit', value: unit});      
        break;
      default:
        console.log('error buyer company product from', target.name, target.value)
    }
  }

  function ExternalBundleUnitInput(props, handleSelect, labelName, unitName, inputLabel, inputUnitLabel) {
    if(props.data.internal_price_category_list.length > 0) {
      return (
        <Row>
          <Col md={6}>
            <FormGroup>
              <Label for="exampleSelect">{inputLabel}</Label>
              <SkInputSelect 
                selectName={labelName}
                handleSelect={handleSelect}
                selectedValue={props.data[labelName]}
                optionsKeyLabel={'label'}
                options={props.data.internal_price_category_list}
              />
            </FormGroup>  
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label for={unitName}>{inputUnitLabel}</Label>
              <Input disabled type="number" name={unitName} id={unitName} placeholder="with a placeholder"  value={ getInputValue(props.data[unitName])}/>
            </FormGroup>	             
          </Col> 
        </Row>
      );  
    }          
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
            <Label for="external_price">Contract price</Label>
            <InputGroup>
              <InputGroupAddon addonType="prepend">
                <InputGroupText className="text-white">
                  $
                </InputGroupText>
              </InputGroupAddon>
              <Input type="number" name="external_price" id="external_price" placeholder="with a placeholder" onChange={handleInputChange} value={ getInputValue(props.data.external_price)}/>
            </InputGroup>                
          </FormGroup>
          {ExternalBundleUnitInput(props, handleSelect, 'external_contract_price_category_label', 'external_contract_price_category_unit', 'Contract bundle', 'Contract unit')}
          {ExternalBundleUnitInput(props, handleSelect, 'external_purchase_price_category_label', 'external_purchase_price_category_unit', 'Purchase bundle', 'Purchase unit')}
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