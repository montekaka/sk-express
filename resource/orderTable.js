const skState = {
	tableHeaders: [
		{'id': 1,'name': "order_number", "format": "string", "label": "Order number", "sort_by":"ASC", "sort_on": false},
		{'id': 2,'name': "slot", "format": "string", "label":"Slot", "sort_by":"ASC", "sort_on": false},
		{'id': 3,'name': "buyer_company_name", "format": "string", "label":"Buyer company name", "sort_by":"ASC", "sort_on": false},
		{'id': 4,'name': "buyer_name", "format": "string", "label":"Buyer name", "sort_by":"ASC", "sort_on": false},
		{'id': 5,'name': "order_date", "format": "date", "label":"Order date", "sort_by":"DESC", "sort_on": true},
		{'id': 6,'name': "order_delivery_date", "format": "date", "label":"Delivery Date", "sort_by":"ASC", "sort_on": false},
		{'id': 7,'name': "total_price", "format": "currency", "label":"Total price", "sort_by":"ASC", "sort_on": false},
		{'id': 8,'name': "is_paid", "format": "boolean", "label":"Payment status", "sort_by":"ASC", "sort_on": false},
		{'id': 9,'name': "is_delivered", "format": "boolean", "label":"Shipping status", "sort_by":"ASC", "sort_on": false},
		{'id': 10,'name': "View", "format": "action", "label":"","action":"GET"}
	], 
	params: {
		SEARCH_TERM: '',
		CURRENT_PAGE: 1			
	},
	apis: {
		FORMAT: '.json',
		GET: '/orders',
		NEW: '/orders',
		DELETE: '/orders',
		UPDATE: '/orders'			
	}	
}

exports.skState = skState;