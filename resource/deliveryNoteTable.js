const skState = {
	tableHeaders: [
		{'id': 1,'name': "delivery_note_number", "format": "string", "label": "Delivery note number", "sort_by":"ASC", "sort_on": false},
		{'id': 2,'name': "delivery_date", "format": "date", "label":"Delivery date", "sort_by":"DESC", "sort_on": true},
		{'id': 3,'name': "buyer_company_name", "format": "string", "label":"Buyer company name", "sort_by":"ASC", "sort_on": false},
		{'id': 4,'name': "buyer_name", "format": "string", "label":"Buyer name", "sort_by":"ASC", "sort_on": false},
		{'id': 5,'name': "shipping_address", "format": "string", "label":"Shipping address", "sort_by":"ASC", "sort_on": false},
		{'id': 6,'name': "phone_number", "format": "string", "label":"Phone number", "sort_by":"ASC", "sort_on": false},
		{'id': 7,'name': "status", "format": "string", "label":"Status", "sort_by":"ASC", "sort_on": false},
		{'id': 10,'name': "View", "format": "action", "label":"","action":"GET"}
	], 
	params: {
		SEARCH_TERM: '',
		CURRENT_PAGE: 1			
	},
	apis: {
		FORMAT: '.json',
		GET: '/delivery_notes',
		NEW: '/delivery_notes',
		DELETE: '/delivery_notes',
		UPDATE: '/delivery_notes'			
	}	
}

exports.skState = skState;