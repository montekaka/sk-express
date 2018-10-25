const skState = {
	tableHeaders: [
		{'id': 1,'name': "name", "format": "string", "label": "Name", "sort_by":"ASC", "sort_on": true},
		{'id': 2,'name': "View", "format": "action", "label":"","action":"GET"}
	], 
	params: {
		SEARCH_TERM: '',
		CURRENT_PAGE: 1			
	},
	apis: {
		FORMAT: '.json',
		GET: '/buyer_companies',
		NEW: '/buyer_companies',
		DELETE: '/buyer_companies',
		UPDATE: '/buyer_companies'		
	}
}

exports.skState = skState;
