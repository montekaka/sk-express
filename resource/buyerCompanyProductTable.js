const skState = {
	tableHeaders: [
        {'id': 1,'name': "internal_product_code", "format": "string", "label": "Internal code", "sort_by":"ASC", "sort_on": true},
        {'id': 2,'name': "internal_product_name", "format": "string", "label": "Internal name", "sort_by":"ASC", "sort_on": true},
        {'id': 3,'name': "external_code", "format": "string", "label": "External code", "sort_by":"ASC", "sort_on": true},
        {'id': 4,'name': "external_name", "format": "string", "label": "External name", "sort_by":"ASC", "sort_on": true},
        {'id': 5,'name': "external_purchase_price_category_label", "format": "string", "label": "Purchase bundle", "sort_by":"ASC", "sort_on": true},
        {'id': 6,'name': "external_purchase_price_category_unit", "format": "number", "label": "Purchase bundle unit", "sort_by":"ASC", "sort_on": true},
        {'id': 7,'name': "external_contract_price_category_label", "format": "string", "label": "Contract bundle", "sort_by":"ASC", "sort_on": true},
        {'id': 8,'name': "external_contract_price_category_unit", "format": "number", "label": "Contract bundle unit", "sort_by":"ASC", "sort_on": true},
        {'id': 9,'name': "external_price", "format": "currency", "label": "Contract price", "sort_by":"ASC", "sort_on": true},
		{'id': 10,'name': "View", "format": "action", "label":"","action":"GET"}
	], 
	params: {
		SEARCH_TERM: '',
		CURRENT_PAGE: 1			
	},
	apis: {
		FORMAT: '.json',
		GET: '/external_product_prices',
		NEW: '/external_product_prices',
		DELETE: '/external_product_prices',
		UPDATE: '/external_product_prices',
		PARENT_GET: '/buyer_companies'		
	}
}

exports.skState = skState;
