const skState = {
	tableHeaders: [
		{'id': 1,'name': "product_code", "format": "string", "label": "Product code", "sort_by":"ASC", "sort_on": true},
		{'id': 2,'name': "name", "format": "string", "label": "Product name", "sort_by":"ASC", "sort_on": true},
		{'id': 3,'name': "external_code", "format": "string", "label": "External code", "sort_by":"ASC", "sort_on": true},
		{'id': 4,'name': "external_name", "format": "string", "label":"External name", "sort_by":"ASC", "sort_on": true},
		{'id': 5,'name': "external_price", "format": "currency", "label":"Price", "sort_by":"ASC", "sort_on": true},
		{'id': 6,'name': "Select", "format": "select", "label":"","action":"GET"}
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
