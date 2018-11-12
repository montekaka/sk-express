import React from 'react';
import { FormGroup, Form, Col, Label, Table, InputGroup, InputGroupAddon, InputGroupText, Input } from 'reactstrap';

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
			price: 0, // contract_price
			product_code: "",
			product_id: 0,
			product_name: "",
			total_price: 0,
			total_unit: 0
		}

		this.handleInputChange = this.handleInputChange.bind(this);
	}

	handleInputChange(){
		console.log('hi')
	}

	componentDidMount() {
		this.setState(this.props.item);
	}

	render() {
		return (
			<div className="card bg-dark text-white">
				<div className="card-body">
					<Table>
						<thead>
							<tr>
								<th>Product code</th>
								<th>Quantity</th>
								<th>Cost per item</th>
								<th>Sub Total</th>
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