import React from 'react';
import Pipe from './../../../../../resource/libs/helpers/pipe.js';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
const actions = Pipe.actions;

class SkTableCell extends React.Component {
	constructor(props) {
		super(props);		
    this.handleViewClick = this.handleViewClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
	}	

	handleViewClick(){
		const id = this.props.tableCell.id;
		const action = this.props.tableCell[this.props.headerItem.name];
		const selectedItem = this.props.tableCell;
		this.props.handleClickItem({id: id, actionType: action, selectedItem: selectedItem});
	}

	handleChange(event){
		const id = this.props.tableCell.id;
		this.props.handleInputChange(id, event);
	}

	render() {
		const format = this.props.headerItem.format;
		const name = this.props.headerItem.name;
		const action = this.props.headerItem.action;
		
    let cell;
    
		switch(format) {
      case 'action': 
        cell = <Link to={this.props.parent_path+this.props.apis[action]+'/'+this.props.tableCell.id} className="btn btn-xs btn-outline-primary" onClick={this.handleViewClick}>{name}</Link>
        break;
      case 'toggle':
				if (this.props.tableCell[this.props.headerItem.name] === 'Selected') {
					cell = <div className="btn btn-xs btn-primary" onClick={this.handleViewClick}>{this.props.tableCell[this.props.headerItem.name]}</div>
				} else {
					cell = <div className="btn btn-xs btn-outline-primary" onClick={this.handleViewClick}>{this.props.tableCell[this.props.headerItem.name]}</div>
				}
				break;
			case 'select': 
				cell = <div className="btn btn-xs btn-outline-info" onClick={this.handleViewClick}>{name}</div>
        break;
			default:
				if (this.props.editing && this.props.headerItem.editable) {
					cell = <input 
						onChange={this.handleChange}
						type={this.props.headerItem.input_format} 
						name={this.props.headerItem.name}
						value={actions[format](this.props.tableCell[this.props.headerItem.name])}
					/>
				} else {
					cell = actions[format](this.props.tableCell[this.props.headerItem.name]);
				}        
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
