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
									parent_path={this.props.parent_path}																		
	          			headerItems={this.props.headerItems} 
	          			objectName={this.props.objectName}
	          			apis={this.props.apis}
									handleClickItem={this.props.handleClickItem}
									handleInputChange={this.props.handleInputChange}
									editing={this.props.editing}
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
