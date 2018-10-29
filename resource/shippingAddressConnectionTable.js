const skState = {
	tableHeaders: [
    {'id': 1,'name': "address_1", "format": "string", "label": "Address", "sort_by":"ASC", "sort_on": true},
    {'id': 2,'name': "phone_number", "format": "string", "label": "Phone number", "sort_by":"ASC", "sort_on": true},
    {'id': 3,'name': "fax_number", "format": "string", "label": "Fax number", "sort_by":"ASC", "sort_on": true},    
    {'id': 4,'name': "action", "format": "toggle", "label":""}
	], 
	params: {
		SEARCH_TERM: '',
		CURRENT_PAGE: 1			
	},
	apis: {
		FORMAT: '.json',
		GET: '/shipping_address_connections',
		NEW: '/shipping_address_connections',
		DELETE: '/shipping_address_connections',
		PARENT_GET: '/buyers'		
	}
}

exports.skState = skState;
