import React from 'react';
import { Redirect } from "react-router-dom";
import axios from 'axios';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import _ from 'underscore';
import Dashheader from './../../components/dashheader/dashheader.jsx';
import config from './../../../../resource/config';
import ProductInventroies from './product_inventories.jsx';

const base_url = config.base_url;

class Product extends React.Component {
	constructor(props) {		
		super(props);
		this.state = {
			id: '',
			api_base: '',
			edit_page: '',
			product_code: null,
			name: null,
			price_category_1_label: null,
			price_category_2_label: null,
			price_category_3_label: null,
			price_category_1_unit: 0,
			price_category_2_unit: 0,
			price_category_3_unit: 0,
			price: 0,
			toGoback: false,
      warehouse_inventories: [],
      sudo_warehouse_inventories: [],
      warehouse_inventories_editing: false
		}
		this.get = this.get.bind(this);
    this.delete = this.delete.bind(this);
    this.handleInventryEditingClick = this.handleInventryEditingClick.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleInventrySaveClick = this.handleInventrySaveClick.bind(this);
    this.handleCancelInventory = this.handleCancelInventory.bind(this);
    this.updateInventory = this.updateInventory.bind(this);
    this.createInventory = this.createInventory.bind(this);    
	}

	componentDidMount() {
	  const id = this.props.params.params.id;
	  const edit_page = `/edit${this.props.skState.apis['UPDATE']}/${id}`;
	  this.setState({edit_page: edit_page});
	  this.get(id);
	}	

	get(id) {
		const api_base = `${this.props.skState.apis['GET']}`
		const api_url = `${base_url+api_base}/${id}.json`;
		this.setState({api_base: api_base})
		const _this = this;
		axios.get(api_url)
			.then((res) => {
				const id = res.data.id;
				const product_code = res.data.product_code;
				const name = res.data.name;
				const price = res.data.price;
				const price_category_1_label = res.data.price_category_1_label;
				const price_category_2_label = res.data.price_category_2_label;
				const price_category_3_label = res.data.price_category_3_label;
				const price_category_1_unit = res.data.price_category_1_unit;
				const price_category_2_unit = res.data.price_category_2_unit;
				const price_category_3_unit = res.data.price_category_3_unit;
        const warehouse_inventories = res.data.warehouse_inventories;
        const sudo_warehouse_inventories = JSON.stringify(res.data.warehouse_inventories);
				_this.setState({id: id, product_code: product_code
					, name: name, price: price
          , warehouse_inventories: warehouse_inventories
          , sudo_warehouse_inventories: sudo_warehouse_inventories
					, price_category_1_label: price_category_1_label
					, price_category_2_label: price_category_2_label
					, price_category_3_label: price_category_3_label
					, price_category_1_unit: price_category_1_unit
					, price_category_2_unit: price_category_2_unit
					, price_category_3_unit: price_category_3_unit										
				});
			})
			.catch((err) => {
				console.log(err);
			})
	}

	delete() {
		const _this = this;
		const api_url = `${base_url+this.state.api_base}/${this.state.id}.json`;
		axios.delete(api_url)
			.then((res) => {
				if (res.status === 204) {
					_this.setState({toGoback: true});
				}
			})
			.catch((err) => {
				console.log("err", err);
			})
  }
  
  handleInventrySaveClick() {
    this.handleInventryEditingClick();
    const warehouse_inventories = this.state.warehouse_inventories;
    let baseEndpoint = `${base_url + this.props.skState.apis['GET']}/${this.state.id}/warehouse_inventories`;
    warehouse_inventories.forEach((item) => {
      if (item.id < 0) {        
        this.createInventory(item, baseEndpoint+'.json');
      } else {
        this.updateInventory(item, baseEndpoint+'/'+item.id+'.json');
      }
    });
    
  }

  updateInventory(item, baseEndpoint) {
    axios.put(baseEndpoint, item)
    .then((res) =>{
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    })
  }

  createInventory(item, baseEndpoint) {
    axios.post(baseEndpoint, item)
    .then((res) =>{
      item['id'] = res.id;
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    }); 
    // console.log(item, baseEndpoint);
    // console.log(this.state.warehouse_inventories)
  }

  handleCancelInventory(){
    const warehouse_inventories_editing = !this.state.warehouse_inventories_editing; 
    const warehouse_inventories = JSON.parse(this.state.sudo_warehouse_inventories);
    this.setState({warehouse_inventories: warehouse_inventories, warehouse_inventories_editing: warehouse_inventories_editing})
  }

  handleInventryEditingClick() {
    const warehouse_inventories_editing = !this.state.warehouse_inventories_editing;
    this.setState({warehouse_inventories_editing: warehouse_inventories_editing});
  }

  handleInputChange(id, e){
    let warehouse_inventories = this.state.warehouse_inventories;
    const name = e.target.name;
    const value = e.target.value;
    warehouse_inventories.forEach((item) => {
      if(item.id === id) {
        item[name] = Number(value);
      }
    });
    this.setState({warehouse_inventories: warehouse_inventories});
  }

	render() {
		if (this.state.toGoback === true) {
			return <Redirect to='/products' />
    }		
    
    let inventoryActionButton;
    if (this.state.warehouse_inventories_editing) {
      inventoryActionButton = 
        <div>
          <div className="btn btn-outline-success product-btn" onClick={this.handleInventrySaveClick}>
            Save
          </div>
          <div className="btn btn-outline-primary product-btn" onClick={this.handleCancelInventory}>
            Cancel
          </div>          
        </div>
    } else {
      inventoryActionButton = <div className="btn btn-outline-primary" onClick={this.handleInventryEditingClick}>Edit</div>
    }

		return (
			<div>
				<Dashheader subtitle={'Overview'} title={'Product Info'}/>
				<Link to={this.state.api_base} className="btn btn-outline-info product-btn">Back</Link>
		    <div className="hr-divider mt-3 mb-5">
		      <h3 className="hr-divider-content hr-divider-heading">{this.state.name}</h3>		      
		    </div>
		    <div className="card bg-dark text-white">
		    	<div className="card-body">
		    		<h5 className="card-title">{this.state.name}</h5>
            <p>Product code: {this.state.product_code}</p>
            <p>Price HK$ {this.state.price}</p>
            <p>Bundle category 1: {this.state.price_category_1_label} {this.state.price_category_1_unit}</p>
            <p>Bundle category 2: {this.state.price_category_2_label} {this.state.price_category_2_unit}</p>
            <p>Bundle category 3: {this.state.price_category_3_label} {this.state.price_category_3_unit}</p>
            <div>
                <Link to={this.state.edit_page} className="btn btn-primary product-btn">Edit</Link>
                <div onClick={this.delete} className="btn btn-outline-danger product-btn">Delete</div>						
            </div>							
		    	</div>
		    </div>
        <div className="card bg-dark text-white">
          <div className="card-body">
            {inventoryActionButton}
            <ProductInventroies
              handleInputChange={this.handleInputChange}
              editing={this.state.warehouse_inventories_editing} 
              headerItems={this.props.skState.inventroyTableHeaders}
              items={this.state.warehouse_inventories}
            />
          </div>          
        </div>		    	    	
	    </div>			
		)
	}	

}

export default Product;