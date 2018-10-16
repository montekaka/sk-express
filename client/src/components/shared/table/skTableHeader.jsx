import React from 'react';
import { Table } from 'reactstrap';
const iconClass = 'icon icon-triangle-';		

class SkTableHeader extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			icon: 'nothing',
			asc: true
		}
		this.setIcon = this.setIcon.bind(this);
		this.handleClick = this.handleClick.bind(this);
	}

	setIcon() {
		var icon = 'nothing';		
		let asc = undefined;
		if (this.props.headerItem['sort_by'] === 'ASC') {
			icon = iconClass+'up';
			asc = true;
		} else if (this.props.headerItem['sort_by'] === 'DESC') {
			icon = iconClass+'down';
			asc = false;
		}		
		this.setState({icon: icon, asc: asc});		
	}

	componentDidMount() {
		this.setIcon();
	}

	handleClick() {
		if (this.props.headerItem.format !== 'action') {
			let newAsc = !this.state.asc;
			let icon = newAsc ? iconClass+'up' : iconClass+'down';
			this.setState({icon: icon, asc: newAsc}, () => {
				this.props.handleClickSort(this.props.headerItem)
			});
		}
	}

	render() {
		return (
			<th onClick={this.handleClick}>
				{this.props.headerItem.label}<span className={this.state.icon}></span>
			</th>
		)
	}
}

export default SkTableHeader;