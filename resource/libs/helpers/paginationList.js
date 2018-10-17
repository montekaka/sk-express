const _ = require('underscore');

const getPaginationList = (currentPage, start, pageItemsCount, min, max) => {
	let _pageItemsCount = pageItemsCount < max ? pageItemsCount : max;

	let end = start + _pageItemsCount;

	let mid = Math.ceil(_pageItemsCount / 2) + start;
	let change = currentPage > mid ? 1 : -1;
	var newStart = start + change;
	var newEnd = end + change;
	if (newStart <= min || newEnd >= max) {
		newStart = start;
		newEnd = end
	}
	return _.range(newStart, newEnd);
}

exports.getPaginationList = getPaginationList;
