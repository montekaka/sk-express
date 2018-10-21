import React from 'react';
import SkTableCell from './skTableCell.jsx'

class SkTableRow extends React.Component {
	constructor(props) {
		super(props);		
	}	

	render() {
		return (
			<tr>
				{
					this.props.headerItems.map((headerItem) => 
						<SkTableCell 
						key={this.props.objectName+"td"+headerItem.id+"|"+this.props.item.id} 
						tableCell={this.props.item} 
						headerItem={headerItem}
						apis={this.props.apis}
						handleClickItem={this.props.handleClickItem}
						/>
					)
				}
	    </tr>
		);
	}
}

export default SkTableRow;
