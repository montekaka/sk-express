import React from 'react';
import axios from 'axios';
import _ from 'underscore';
import SkTable from './../table/skTable.jsx';
import SkPagination from './../pagination/skPagination.jsx';
import SkSearchBar from './../searchbar/skSearchBar.jsx';
import paginationList from './../../../../../resource/libs/helpers/paginationList';
import sortedParams from './../../../../../resource/libs/helpers/sortedParams';
import debounce from './../../../../../resource/libs/helpers/debounce';
const getPaginationList = paginationList.getPaginationList;
const getSortedParams = sortedParams.get;
const resetSortedParams = sortedParams.reset;
const debounceHandler = debounce.debounce;

class TablePagination extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			items: null,
			total: 0,
			totalPage: 0,
			perPage: 8,
			//currentPage: 1,
			startPage: 1,
			pageItemsCount: 10,
			//searchTerm: null,
			pageItems: [],
			get_url: '',
      base_url: '',
      parent_path: ''
		}

		this.fetch = this.fetch.bind(this);
		//this.handleClickLinkToPage = this.handleClickLinkToPage.bind(this);
		this.handleClickSort = this.handleClickSort.bind(this);
		this.handleClickPageNumber = this.handleClickPageNumber.bind(this);
		this.handleSearch = this.handleSearch.bind(this);
		this.delayedCallback = debounceHandler(this.handleSearchApi, 500);
		this.handleClickItem = this.handleClickItem.bind(this);
	}

	componentDidMount() {
		const _this = this;
    var parent_path = this.props.parent_path ? this.props.parent_path : '';
    this.setState({perPage: this.props.perPage
      , parent_path: parent_path
			, pageItemsCount: this.props.pageItemsCount
			, get_url: this.props.skState.apis['GET']+this.props.skState.apis['FORMAT']
			, base_url: this.props.base_url}, () => {
				//_this.fetch(_this.state.currentPage);
				_this.fetch(_this.props.skState.params.CURRENT_PAGE);
			});		
	}

	fetch(page_number) {
		const _this = this;	
		const api_url = _this.state.base_url+_this.state.get_url;
		let params = getSortedParams(this.props.skState.tableHeaders);
		params['page'] = page_number;
		params['per_page'] = _this.state.perPage;
		
		if (this.props.skState.params.SEARCH_TERM !== null && this.props.skState.params.SEARCH_TERM.length > 0 ) {
			params['search_value'] = this.props.skState.params.SEARCH_TERM;
		}

		// const api_url = `${_this.state.base_url+_this.state.get_url}?page=${page_number}&per_page=${_this.state.perPage}`;
		axios.get(api_url, {
  		params: params
		})		
		.then((res) => {
			let perPage = Number(res.headers['per-page']);
			let total = Number(res.headers['total']);
			let totalPage = perPage > 0 ? Math.ceil(total / perPage) : 0;	
			let pageItems = getPaginationList(page_number, this.state.startPage, this.state.pageItemsCount , 0, totalPage);
			let startPage = pageItems[0];	
			_this.props.handleUpdateTotalItems(totalPage, total);
			_this.props.skState.params.CURRENT_PAGE = page_number;
			_this.setState({
				items: res.data, 
				perPage: perPage, 
				totalPage: totalPage, 
				total: total, 
				//currentPage: page_number,
				pageItems: pageItems,
				startPage: startPage
			});								
		})
		.catch((err) => {
			console.log(err);
		});				
	}

	// handleClickLinkToPage(id){
	// 	console.log(id);
	// }	

	handleClickSort(column) {
		let newSortBy = column['sort_by'] === 'ASC' ? 'DESC' : 'ASC';
		resetSortedParams(this.props.skState.tableHeaders);
		let idx = _.findLastIndex(this.props.skState.tableHeaders, column);
		if (idx > -1) {
			this.props.skState.tableHeaders[idx]['sort_by'] = newSortBy;
			this.props.skState.tableHeaders[idx]['sort_on'] = true;
		}
		this.props.skState.params.CURRENT_PAGE = 1;
		this.setState({startPage: 1}, () => {
			this.fetch(1);
		});
		// we will call the fetch method get new data, remember to set the page_number to 1
		//console.log(getSortedParams(this.props.skState.tableHeaders));
		//console.log(this.props.skState.tableHeaders[idx])
	}	

	handleClickPageNumber(num){
		this.fetch(num);
	}	

	handleSearch(searchTerm) {
		this.props.skState.params.CURRENT_PAGE = 1;
		this.props.skState.params.SEARCH_TERM = searchTerm;

		this.setState({startPage: 1}, () => {
			this.delayedCallback();
		});
	}

	handleSearchApi(){
		this.fetch(1);
	}

	handleClickItem(clickedItem){
		this.props.skState.params.SEARCH_TERM = '';
		if(this.props.handleClickItem) {
			this.props.handleClickItem(clickedItem);
		}		
	}

	render() {
		let table;
		if(this.state.items === null) {
			table = <div>Loading...</div>
		} else if (this.state.items.length > 0) {
			table = <div>
		    <SkTable 
		    	headerItems={this.props.skState.tableHeaders} 
          items={this.state.items}
          parent_path={this.state.parent_path}
		    	apis={this.props.skState.apis} 
		    	handleClickSort={this.handleClickSort}
		    	handleClickItem={this.handleClickItem}/>			
		    <SkPagination 
		    	currentPage={this.props.skState.params.CURRENT_PAGE}
		    	pageItems={this.state.pageItems}
		    	handleClickPageNumber={this.handleClickPageNumber} 
		    	totalPage={this.state.totalPage}/>					
			</div>			
		} else {
			table = <div>There isn't any products for this buyer company</div>
		}
		return (
			<div className="card bg-dark text-white">
				<div className="card-body">
					<div className="searchbar">
						<SkSearchBar handleSearch={this.handleSearch} search_term={this.props.skState.params.SEARCH_TERM}/>		
					</div>
					{table}								
				</div>	    		
			</div>
		)
	}
}

export default TablePagination;