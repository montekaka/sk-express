const skState = {
	tableHeaders: [
		{'id': 1,'name': "product_code", "format": "string", "label": "Product code", "sort_by":"ASC", "sort_on": true},
		{'id': 2,'name': "name", "format": "string", "label":"Name", "sort_by":"ASC", "sort_on": true},
		{'id': 3,'name': "price_category_1_label", "format": "string", "label":"Bundle Type", "sort_by":"ASC", "sort_on": true},
		{'id': 4,'name': "price_category_1_unit", "format": "number", "label":"Bundle Unit", "sort_by":"ASC", "sort_on": true},
		{'id': 5,'name': "price", "format": "currency", "label":"Price", "sort_by":"ASC", "sort_on": true},
		{'id': 6,'name': "View", "format": "action", "label":"","action":"GET"}
	], 
	params: {
		SEARCH_TERM: '',
		CURRENT_PAGE: 1			
	},
	apis: {
		FORMAT: '.json',
		GET: '/products',
		NEW: '/products',
		DELETE: '/products',
		UPDATE: '/products'		
	},
	inventroyTableHeaders: [
		{'id': 1,'name': "warehouse_name", "format": "string", "label":"Warehouse name", "sort_by":"ASC", "sort_on": true},
		{'id': 2,'name': "quantity", "format": "number", "label":"Quantity", "sort_by":"ASC", "sort_on": true},
		{'id': 3,'name': "min", "format": "number", "label":"Min", "sort_by":"ASC", "sort_on": true},
		{'id': 4,'name': "max", "format": "number", "label":"Max", "sort_by":"ASC", "sort_on": true}
	]
}


const get = (id) => {
	
}

exports.skState = skState;
