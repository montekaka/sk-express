const skState = {
  tableHeaders: [
    {'id': 1,'name': "name", "format": "string", "label": "Name", "sort_by":"ASC", "sort_on": true},
    {'id': 2,'name': "email", "format": "string", "label": "Email", "sort_by":"ASC", "sort_on": true},
    {'id': 3,'name': "phone_number", "format": "string", "label": "Phone number", "sort_by":"ASC", "sort_on": true}
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
    UPDATE: '/buyers',
    PARENT_GET: '/buyer_companies'       
  }
}

exports.skState = skState;
