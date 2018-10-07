const tableHeaders = [
	{'id': 1,'name': "order_number", "format": "string", "label": "Order number"},
	{'id': 2,'name': "slot", "format": "string", "label":"Slot"},
	{'id': 3,'name': "buyer_name", "format": "string", "label":"Buyer company name"},
	{'id': 4,'name': "buyer_name", "format": "string", "label":"Buyer name"},
	{'id': 5,'name': "order_date", "format": "date", "label":"Order date"},
	{'id': 6,'name': "order_delivery_date", "format": "date", "label":"Delivery Date"},
	{'id': 7,'name': "total_price", "format": "currency", "label":"Total price"},
	{'id': 8,'name': "is_paid", "format": "boolean", "label":"Payment status"},
	{'id': 9,'name': "is_delivered", "format": "boolean", "label":"Shipping status"},
	{'id': 10,'name': "View", "format": "action", "label":""},
	{'id': 11,'name': "Edit", "format": "action", "label":""}
];

exports.tableHeaders = tableHeaders;