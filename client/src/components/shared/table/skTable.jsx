import React from 'react';
import { Table } from 'reactstrap';
import SkTableRow  from './skTableRow.jsx'
import SkTableHeader  from './skTableHeader.jsx'

class SkTable extends React.Component {
	constructor(props) {
		super(props);		
	}

	render() {
		return (
	    <div className="table-responsive">
				<Table hover size="sm" bordered dark>
	        <thead>
	          <tr>
	          	{
	          		this.props.headerItems.map((headerItem) => <SkTableHeader key={this.props.objectName+'th'+headerItem.id} headerItem={headerItem} handleClickSort={this.props.handleClickSort}/>)
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
