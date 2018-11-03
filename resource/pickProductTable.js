// this one is for picking product to add to buyer company product
const skState = {
	tableHeaders: [
		{'id': 1,'name': "product_code", "format": "string", "label": "Product code", "sort_by":"ASC", "sort_on": true},
		{'id': 2,'name': "name", "format": "string", "label":"Name", "sort_by":"ASC", "sort_on": true},
		{'id': 3,'name': "price_category_1_label", "format": "string", "label":"Bundle Type", "sort_by":"ASC", "sort_on": true},
		{'id': 4,'name': "price_category_1_unit", "format": "number", "label":"Bundle Unit", "sort_by":"ASC", "sort_on": true},
		{'id': 5,'name': "price", "format": "currency", "label":"Price", "sort_by":"ASC", "sort_on": true},
		{'id': 6,'name': "Select", "format": "action", "label":"","action":"GET"}
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
		UPDATE: '/products',
		PARENT_PATH: '/buyer_companies'				
	}
}


exports.skState = skState;
