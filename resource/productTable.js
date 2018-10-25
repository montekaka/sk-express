const skState = {
	tableHeaders: [
		{'id': 1,'name': "product_code", "format": "string", "label": "Product code", "sort_by":"ASC", "sort_on": true},
		{'id': 2,'name': "name", "format": "string", "label":"Name", "sort_by":"ASC", "sort_on": true},
		{'id': 3,'name': "price", "format": "currency", "label":"Price", "sort_by":"ASC", "sort_on": true},
		{'id': 4,'name': "View", "format": "action", "label":"","action":"GET"}
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
	}
}


const get = (id) => {
	
}

exports.skState = skState;
