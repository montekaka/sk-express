import React from 'react';
import { Table, InputGroup, InputGroupAddon, InputGroupText, Input } from 'reactstrap';

class OrderItem extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			id: 0,
			is_delivered: false,
			order_id: 0,
			product_code: "",
			product_id: 0,
			product_name: "",
			total_price: 0,
			price: 0,
			total_unit: 0,
			delivery_date: 0
		}

		this.handleInputChange = this.handleInputChange.bind(this);
	}

	handleInputChange(){
		console.log('hi')
	}

	componentDidMount() {
		// this.setState(this.props.item);
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
									<Input type="text" name="product_code" id="product_code" placeholder="with a placeholder" onChange={this.handleInputChange} />
								</td>
								<td>
									<Input type="number" name="total_unit" id="total_unit" placeholder="with a placeholder" onChange={this.handleInputChange}/>
								</td>
								<td>
									<Input type="number" name="price" id="price" placeholder="with a placeholder" onChange={this.handleInputChange}/>
								</td>
								<td>
									<Input type="number" name="total_price" id="total_price" placeholder="with a placeholder" onChange={this.handleInputChange}/>
								</td>																								
							</tr>
						</tbody>
					</Table>
				</div>
			</div>
		)		
	}
}

export default OrderItem;