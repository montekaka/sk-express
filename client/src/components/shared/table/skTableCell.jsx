import React from 'react';
import Pipe from './../../../../../resource/libs/helpers/pipe.js';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
const actions = Pipe.actions;

class SkTableCell extends React.Component {
	constructor(props) {
		super(props);		
		this.handleViewClick = this.handleViewClick.bind(this);
	}	

	handleViewClick(){
		const id = this.props.tableCell.id;
		const action = this.props.tableCell[this.props.headerItem.name];
		this.props.handleClickItem({shipping_address_id: id, actionType: action});
	}

	render() {
		const format = this.props.headerItem.format;
		const name = this.props.headerItem.name;
		const action = this.props.headerItem.action;
		
    let cell;
    
		switch(format) {
      case 'action': 
        cell = <Link to={this.props.parent_path+this.props.apis[action]+'/'+this.props.tableCell.id} className="btn btn-xs btn-outline-primary">{name}</Link>
        break;
      case 'toggle':
				if (this.props.tableCell[this.props.headerItem.name] === 'Selected') {
					cell = <div className="btn btn-xs btn-primary" onClick={this.handleViewClick}>{this.props.tableCell[this.props.headerItem.name]}</div>
				} else {
					cell = <div className="btn btn-xs btn-outline-primary" onClick={this.handleViewClick}>{this.props.tableCell[this.props.headerItem.name]}</div>
				}
        break;
      default: 
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
