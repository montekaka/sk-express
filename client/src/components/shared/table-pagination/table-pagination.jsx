import React from 'react';
import axios from 'axios';
import _ from 'underscore';
import SkTable from './../table/skTable.jsx';
import SkPagination from './../pagination/skPagination.jsx';
import paginationList from './../../../../../resource/libs/helpers/paginationList';
import sortedParams from './../../../../../resource/libs/helpers/sortedParams';
const getPaginationList = paginationList.getPaginationList;
const getSortedParams = sortedParams.get;
const resetSortedParams = sortedParams.reset;

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
		this.handleClickPageNumber = this.handleClickPageNumber.bind(this);
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

	fetch(page_number, order_by) {
		const _this = this;	
		const params = getSortedParams(this.props.tableHeaders);
		const api_url = `${_this.state.base_url+_this.state.get_url}?page=${page_number}&per_page=${_this.state.perPage}`;
		axios.get(api_url, {
    		params: params
  		})
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
		let newSortBy = column['sort_by'] === 'ASC' ? 'DESC' : 'ASC';
		resetSortedParams(this.props.tableHeaders);
		let idx = _.findLastIndex(this.props.tableHeaders, column);
		if (idx > -1) {
			this.props.tableHeaders[idx]['sort_by'] = newSortBy;
			this.props.tableHeaders[idx]['sort_on'] = true;
		}
		this.setState({currentPage: 1, startPage: 1}, () => {
			this.fetch(1);
		});
		// we will call the fetch method get new data, remember to set the page_number to 1
		//console.log(getSortedParams(this.props.tableHeaders));
		//console.log(this.props.tableHeaders[idx])
	}	

	handleClickPageNumber(num){
		this.fetch(num);
	}	
	render() {
		return (
			<div>
		    <SkTable 
		    	headerItems={this.props.tableHeaders} 
		    	items={this.state.items} 
		    	handleClickSort={this.handleClickSort}
		    	handleView={this.handleClickLinkToPage}/>			
		    <SkPagination 
		    	currentPage={this.state.currentPage}
		    	pageItems={this.state.pageItems}
		    	handleClickPageNumber={this.handleClickPageNumber} 
		    	totalPage={this.state.totalPage}/>		    		
			</div>
		)
	}
}

export default TablePagination;