const skState = {
	tableHeaders: [
		{'id': 1,'name': "order_number", "format": "string", "label": "订单号", "sort_by":"ASC", "sort_on": true},
		{'id': 2,'name': "slot", "format": "string", "label":"买家公司订单号", "sort_by":"ASC", "sort_on": true},
		{'id': 3,'name': "buyer_company_name", "format": "string", "label":"买家公司", "sort_by":"ASC", "sort_on": true},
		{'id': 4,'name': "buyer_name", "format": "string", "label":"买家", "sort_by":"ASC", "sort_on": true},
		{'id': 5,'name': "order_date", "format": "date", "label":"订单日期", "sort_by":"ASC", "sort_on": true},
		{'id': 6,'name': "order_delivery_date", "format": "date", "label":"送货日期", "sort_by":"ASC", "sort_on": true},
		{'id': 7,'name': "total_price", "format": "currency", "label":"订单总价", "sort_by":"ASC", "sort_on": true},
		{'id': 8,'name': "is_paid", "format": "boolean", "label":"Payment status", "sort_by":"ASC", "sort_on": true},
		{'id': 9,'name': "is_delivered", "format": "boolean", "label":"Shipping status", "sort_by":"ASC", "sort_on": true},
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