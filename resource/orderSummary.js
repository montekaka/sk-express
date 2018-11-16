const skState = {
	orderSummaryHeaders: [
		{'id': 1,'name': "shipping_method", "format": "string", "label": "Shiping method"},
		{'id': 2,'name': "sales_rep", "format": "string", "label": "Sales Rep"},
		{'id': 3,'name': "terms", "format": "string", "label": "Terms"},
		{'id': 4,'name': "slot", "format": "string", "label": "Slot"},
		{'id': 5,'name': "total_price", "format": "currency", "label": "Total"},
	],
  orderItemHeaders: [
    {'id': 1,'name': "product_code", "format": "string", "label": "Product code"},
    {'id': 2,'name': "product_name", "format": "string", "label": "Product name"},
    {'id': 3,'name': "price", "format": "currency", "label": "Price"},
    {'id': 4,'name': "total_unit", "format": "number", "label": "Unit"},
    {'id': 5,'name': "order_price_category_label", "format": "string", "label": "Unit category"},    
    {'id': 6,'name': "total_price", "format": "currency", "label": "Total price"},
  ]
}

exports.skState = skState;