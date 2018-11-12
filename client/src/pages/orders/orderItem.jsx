import React from 'react';
import _ from 'underscore';
import { FormGroup, Form, Col, Label, Table, InputGroup, InputGroupAddon, InputGroupText, Input } from 'reactstrap';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment';
import SkInputSelect from './../../components/shared/input-selection/input-selection.jsx'

class OrderItem extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			contract_price_category_label: "",
			contract_price_category_unit: 0,
			delivery_date: 0,
			delivery_note_id: "",
			id: 0,
			is_delivered: false,
			order_id: 0,
			order_price_category_label: "",
			order_price_category_unit: 0,
			price: 0, // order price
			unit_price: 0, // contract_price
			product_code: "",
			product_id: 0,
			product_name: "",
			total_price: 0,
			total_unit: 0,
			internal_price_category_list: []
		}

		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleDeliveryDateChange = this.handleDeliveryDateChange.bind(this);
		this.calculateSubTotal = this.calculateSubTotal.bind(this);
		this.handleSelect = this.handleSelect.bind(this);
	}

	componentDidMount() {
		const _this = this;
		this.setState(this.props.item, () => {			
			let price = 0;
			this.state.contract_price_category_unit > 0 ? price = this.state.unit_price * this.state.order_price_category_unit / this.state.contract_price_category_unit : price = this.state.unit_price;
			_this.setState({delivery_date: _this.props.order_delivery_date, price: price}, () => {
				this.props.updateOrderItemState(this.state.id, {price: price})
			});
		});
	}

	componentDidUpdate(prevProps) {
		if (this.props.order_delivery_date !== prevProps.order_delivery_date) {
			this.setState({delivery_date: this.props.order_delivery_date});
		}
	}

	handleSelect(target) {
		const selectedItem = target.value;
    const result = _.filter(this.state.internal_price_category_list, (item) => {
      return item['label'] === selectedItem;
    });
    const label = result[0]['label'];
    const unit = Number(result[0]['unit']);
    let price = 0;
    this.state.contract_price_category_unit > 0 ? price = this.state.unit_price * unit / this.state.contract_price_category_unit : price = this.state.unit_price;
    this.setState({price: price, order_price_category_label: label, order_price_category_unit: unit}, () => {
    	this.props.updateOrderItemState(this.state.id, {price: price, order_price_category_label: label, order_price_category_unit: unit})
    	this.calculateSubTotal();
    });
	}

	calculateSubTotal() {
		let total_price = this.state.price * this.state.total_unit;		
		const _this = this;
		this.setState({total_price: total_price});
	}

	handleInputChange(event){
		const name = event.target.name;
		const value = event.target.value;
		if(name === 'total_unit' || name === 'price') {
			const val = Number(value);
			this.setState({[name]: val}, () => {
				this.calculateSubTotal();
				let total_price = this.state.price * this.state.total_unit;
				this.props.updateOrderItemState(this.state.id, {[name]: val, total_price: total_price})
			})
		} else {
			this.setState({[name]: value}, () => {
				this.props.updateOrderItemState(this.state.id, {[name]: value})
			});
		}
	}


  handleDeliveryDateChange(event) {
    const value = moment(event._d).format(event._f);
    this.setState({delivery_date: value}, () => {
    	this.props.updateOrderItemState(this.state.id, {delivery_date: value})
    });
  }	

	render() {
		let th = null;
		if (this.props.is_per_item_delivery_date) {
			th = <th>Delivery date</th>;
		}

		return (
			<div className="card bg-dark text-white">
				<div className="card-body">
					<Table>
						<thead>
							<tr>
								<th>Product code</th>
								{
									this.state.internal_price_category_list && this.state.internal_price_category_list.length > 0 &&
									<th>Order unit</th>
								}
								<th>Quantity</th>
								<th>Cost per item</th>
								<th>Sub Total</th>
								{
									this.props.is_per_item_delivery_date &&
									<th>Delivery date</th>
								}
							</tr>
						</thead>
						<tbody>
							<tr>
								<td>
									<Input type="text" name="product_code" id="product_code" 
									placeholder="with a placeholder"
									value={this.state.product_code} 
									onChange={this.handleInputChange} />
								</td>
								{
									this.state.internal_price_category_list && this.state.internal_price_category_list.length > 0 &&
									<td>
			              <SkInputSelect 			                
			                handleSelect={this.handleSelect}
			                selectName={'order_price_category_label'}
			                selectedValue={this.state.order_price_category_label}
			                optionsKeyLabel={'label'}
			                options={this.state.internal_price_category_list}
			              />
			            </td>			             										
								}							
								<td>
									<Input type="number" name="total_unit" id="total_unit" placeholder="with a placeholder" 
									value={this.state.total_unit}
									onChange={this.handleInputChange}/>
								</td>
								<td>
									<Input type="number" name="price" id="price" placeholder="with a placeholder"
									value={this.state.price}
									onChange={this.handleInputChange}/>
								</td>
								<td>
									<Input type="number" name="total_price" id="total_price" placeholder="with a placeholder" 
									disabled
									value={this.state.total_price}
									onChange={this.handleInputChange}/>
								</td>
								{
									this.props.is_per_item_delivery_date &&
									<td>
		                <DatePicker
		                    name="delivery_date"                  
		                    className="form-control"
		                    showMonthDropdown
		                    useShortMonthInDropdown
		                    dateFormat="YYYY/MM/DD"
		                    selected={moment(this.state.delivery_date)}
		                    onChange={this.handleDeliveryDateChange}
		                />  									
									</td>									
								}
							</tr>
						</tbody>
					</Table>
					<Form>
						<FormGroup row>
							<Label for="product_name" sm={2}>Product name</Label>
							<Col sm={10}>
								<Input type="text" name="product_name" id="buyerName" placeholder="with a placeholder" onChange={this.handleInputChange} value={ this.state.product_name}/>
							</Col>
						</FormGroup>
					</Form>
				</div>
			</div>
		)		
	}
}

export default OrderItem;