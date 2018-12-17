const _ = require('underscore');

const getPaginationList = (currentPage, start, pageItemsCount, min, max) => {

	let incremental = pageItemsCount / 2;
	let _pageItemsCount = max < pageItemsCount ? max : pageItemsCount;

	if (currentPage === start || currentPage === (start + pageItemsCount - 1)) {
		newEnd = currentPage + incremental;
		newStart = newEnd - _pageItemsCount;
	} 
	if (newEnd > max) {
		newEnd = max + 1;
		newStart = newEnd - _pageItemsCount;
	} 
	if (newStart < min) {
		newStart = min;
		newEnd = newStart + _pageItemsCount;
	}

	return _.range(newStart, newEnd);
}

exports.getPaginationList = getPaginationList;
