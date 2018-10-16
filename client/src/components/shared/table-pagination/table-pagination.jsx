import React from 'react';
import axios from 'axios';
import _ from 'underscore';
import SkTable from './../table/skTable.jsx';
import paginationList from './../../../../../resource/libs/helpers/paginationList';
const getPaginationList = paginationList.getPaginationList;

class TablePagination extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			items: [],
			total: 0,
			totalPage: 0,
			perPage: 8,
			currentPage: 1,
			startPage: 1,
			pageItemsCount: 10,
			pageItems: [],
			get_url: '',
			base_url: ''
		}

		this.fetch = this.fetch.bind(this);
		this.handleClickLinkToPage = this.handleClickLinkToPage.bind(this);
		this.handleClickSort = this.handleClickSort.bind(this);
	}

	componentDidMount() {
		const _this = this;
		this.setState({perPage: this.props.perPage
			, pageItemsCount: this.props.pageItemsCount
			, get_url: this.props.get_url
			, base_url: this.props.base_url}, () => {
				_this.fetch(_this.state.currentPage);
			});		
	}

	fetch(page_number) {
		const _this = this;
		const api_url = `${_this.state.base_url+_this.state.get_url}?page=${page_number}&per_page=${_this.state.perPage}`;
		axios.get(api_url)
			.then((res) => {
				let perPage = Number(res.headers['per-page']);
				let total = Number(res.headers['total']);
				let totalPage = perPage > 0 ? Math.ceil(total / perPage) : 0;	
				let pageItems = getPaginationList(page_number, this.state.startPage, this.state.pageItemsCount , 0, totalPage);
				let startPage = pageItems[0];	
				_this.setState({
					items: res.data, 
					perPage: perPage, 
					totalPage: totalPage, 
					total: total, 
					currentPage: page_number,
					pageItems: pageItems,
					startPage: startPage
				});								
			})
			.catch((err) => {
				console.log(err);
			});				
	}

	handleClickLinkToPage(id){
		console.log(id);
	}	

	handleClickSort(column) {
		let new_sort_by = column['sort_by'] === 'ASC' ? 'DESC' : 'ASC';
		let idx = _.findLastIndex(this.props.tableHeaders, column);
		if (idx > -1) {
			this.props.tableHeaders[idx]['sort_by'] = new_sort_by;
		}
		console.log(this.props.tableHeaders[idx])
		//console.log(column);
	}	
	render() {
		return (
			<div>
		    <SkTable 
		    	headerItems={this.props.tableHeaders} 
		    	items={this.state.items} 
		    	handleClickSort={this.handleClickSort}
		    	handleView={this.handleClickLinkToPage}/>				
			</div>
		)
	}
}

export default TablePagination;