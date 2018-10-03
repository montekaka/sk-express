import React from 'react';
import { Table } from 'reactstrap';
import SkTableRow  from './skTableRow.jsx'

class SkTable extends React.Component {
	constructor(props) {
		super(props);		
	}

	render() {
		return (
	    <div className="table-responsive">
				<Table hover size="sm" bordered>
	        <thead>
	          <tr>
	          	{
	          		this.props.headerItems.map((headerItem) => <th key={this.props.objectName+'th'+headerItem.id}>{headerItem.label}</th>)
	          	}
	          </tr>
	        </thead>
	        <tbody>
	          {
	          	this.props.items.map((item) => 
	          		<SkTableRow 
	          			item={item} 
	          			key={this.props.objectName+'tr'+item.id} 
	          			headerItems={this.props.headerItems} 
	          			objectName={this.props.objectName}
	          			handleView={this.props.handleView}
	          			/>
	          	)
	          }		        
	        </tbody>
	      </Table>
	    </div>			
		);
	}
}

export default SkTable;
