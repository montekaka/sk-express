const tableHeaders = [
	{'id': 1,'name': "product_code", "format": "string", "label": "Product code", "sort_by":"ASC", "sort_on": true},
	{'id': 2,'name': "name", "format": "string", "label":"Name", "sort_by":"ASC", "sort_on": true},
	{'id': 3,'name': "price", "format": "currency", "label":"Price", "sort_by":"ASC", "sort_on": true},
	{'id': 4,'name': "View", "format": "action", "label":""}
];

const skState = {
	tableHeaders: [
		{'id': 1,'name': "product_code", "format": "string", "label": "Product code", "sort_by":"ASC", "sort_on": true},
		{'id': 2,'name': "name", "format": "string", "label":"Name", "sort_by":"ASC", "sort_on": true},
		{'id': 3,'name': "price", "format": "currency", "label":"Price", "sort_by":"ASC", "sort_on": true},
		{'id': 4,'name': "View", "format": "action", "label":""}
	], 
	params: {
		SEARCH_TERM: null,
		CURRENT_PAGE: 1			
	}
}

exports.tableHeaders = tableHeaders;
exports.skState = skState;