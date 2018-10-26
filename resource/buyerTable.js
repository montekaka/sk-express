const skState = {
	tableHeaders: [
        {'id': 1,'name': "name", "format": "string", "label": "Name", "sort_by":"ASC", "sort_on": true},
        {'id': 2,'name': "email", "format": "string", "label": "Email", "sort_by":"ASC", "sort_on": true},
        {'id': 3,'name': "phone_number", "format": "string", "label": "Phone number", "sort_by":"ASC", "sort_on": true},
        {'id': 4,'name': "buyer_company_name", "format": "string", "label": "Buyer company name", "sort_by":"ASC", "sort_on": true},
		    {'id': 5,'name': "View", "format": "action", "label":"","action":"GET"}
	], 
	params: {
		SEARCH_TERM: '',
		CURRENT_PAGE: 1			
	},
	apis: {
		FORMAT: '.json',
		GET: '/buyers',
		NEW: '/buyers',
		DELETE: '/buyers',
		UPDATE: '/buyers'		
	}
}

exports.skState = skState;
