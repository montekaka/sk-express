const skState = {
	tableHeaders: [
		{'id': 1,'name': "external_code", "format": "string", "label": "Product code", "sort_by":"ASC", "sort_on": true},
		{'id': 2,'name': "external_name", "format": "string", "label":"Name", "sort_by":"ASC", "sort_on": true},
		{'id': 3,'name': "external_price", "format": "currency", "label":"Price", "sort_by":"ASC", "sort_on": true},
		{'id': 4,'name': "Select", "format": "select", "label":"","action":"GET"}
	], 
	params: {
		SEARCH_TERM: '',
		CURRENT_PAGE: 1			
	},
	apis: {
		FORMAT: '.json',
		GET: '/external_product_prices'
	}
}

exports.skState = skState;
