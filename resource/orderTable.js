const tableHeaders = [
	{'id': 1,'name': "order_number", "format": "string", "label": "Order number", "sort_by":"ASC", "sort_on": true},
	{'id': 2,'name': "slot", "format": "string", "label":"Slot", "sort_by":"ASC", "sort_on": true},
	{'id': 3,'name': "buyer_name", "format": "string", "label":"Buyer company name", "sort_by":"ASC", "sort_on": true},
	{'id': 4,'name': "buyer_name", "format": "string", "label":"Buyer name", "sort_by":"ASC", "sort_on": true},
	{'id': 5,'name': "order_date", "format": "date", "label":"Order date", "sort_by":"ASC", "sort_on": true},
	{'id': 6,'name': "order_delivery_date", "format": "date", "label":"Delivery Date", "sort_by":"ASC", "sort_on": true},
	{'id': 7,'name': "total_price", "format": "currency", "label":"Total price", "sort_by":"ASC", "sort_on": true},
	{'id': 8,'name': "is_paid", "format": "boolean", "label":"Payment status", "sort_by":"ASC", "sort_on": true},
	{'id': 9,'name': "is_delivered", "format": "boolean", "label":"Shipping status", "sort_by":"ASC", "sort_on": true},
	{'id': 10,'name': "View", "format": "action", "label":""},
	{'id': 11,'name': "Edit", "format": "action", "label":""}
];

const skState = {
	tableHeaders: [
		{'id': 1,'name': "order_number", "format": "string", "label": "Order number", "sort_by":"ASC", "sort_on": true},
		{'id': 2,'name': "slot", "format": "string", "label":"Slot", "sort_by":"ASC", "sort_on": true},
		{'id': 3,'name': "buyer_name", "format": "string", "label":"Buyer company name", "sort_by":"ASC", "sort_on": true},
		{'id': 4,'name': "buyer_name", "format": "string", "label":"Buyer name", "sort_by":"ASC", "sort_on": true},
		{'id': 5,'name': "order_date", "format": "date", "label":"Order date", "sort_by":"ASC", "sort_on": true},
		{'id': 6,'name': "order_delivery_date", "format": "date", "label":"Delivery Date", "sort_by":"ASC", "sort_on": true},
		{'id': 7,'name': "total_price", "format": "currency", "label":"Total price", "sort_by":"ASC", "sort_on": true},
		{'id': 8,'name': "is_paid", "format": "boolean", "label":"Payment status", "sort_by":"ASC", "sort_on": true},
		{'id': 9,'name': "is_delivered", "format": "boolean", "label":"Shipping status", "sort_by":"ASC", "sort_on": true},
		{'id': 10,'name': "View", "format": "action", "label":""},
		{'id': 11,'name': "Edit", "format": "action", "label":""}
	], 
	params: {
		SEARCH_TERM: '',
		CURRENT_PAGE: 1			
	}
}


exports.tableHeaders = tableHeaders;
exports.skState = skState;