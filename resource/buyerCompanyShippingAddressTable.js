const skState = {
	tableHeaders: [
        {'id': 1,'name': "address_1", "format": "string", "label": "Address", "sort_by":"ASC", "sort_on": true},
        {'id': 2,'name': "fax_number", "format": "string", "label": "Fax number", "sort_by":"ASC", "sort_on": true},
        {'id': 3,'name': "phone_number", "format": "string", "label": "Phone number", "sort_by":"ASC", "sort_on": true},
		    {'id': 5,'name': "View", "format": "action", "label":"","action":"GET"}
	], 
	params: {
		SEARCH_TERM: '',
		CURRENT_PAGE: 1			
	},
	apis: {
		FORMAT: '.json',
		GET: '/shipping_addresses',
		NEW: '/shipping_addresses',
		DELETE: '/shipping_addresses',
		UPDATE: '/shipping_addresses',
		PARENT_GET: '/buyer_companies'		
	}
}

exports.skState = skState;
