import React from 'react';
import Pipe from './../../../../../resource/libs/helpers/pipe.js';
const actions = Pipe.actions;

class SkTableCell extends React.Component {
	constructor(props) {
		super(props);		
		this.handleViewClick = this.handleViewClick.bind(this);
	}	

	handleViewClick(){
		const id = this.props.tableCell.id;
		this.props.handleView(id);
	}

	render() {
		const format = this.props.headerItem.format;
		const name = this.props.headerItem.name;
		let cell;
		if(format === 'action') {			
			cell = <div className="btn btn-primary" onClick={this.handleViewClick}>{name}</div>;
		} else {
			cell = actions[format](this.props.tableCell[this.props.headerItem.name]);
		}

		return (
			<td>
				{
					cell
				}
	    </td>
		);
	}
}

export default SkTableCell;
