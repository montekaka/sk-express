const _ = require('underscore');

const get = (headers) => {
	var params = [];
	for (var i = 0; i < headers.length; i++) {
		let header = headers[i];
		if (header['format'] !== 'action' && header['sort_on'] === true) {
			let param = `${header['name']} ${header['sort_by']}`;
			params.push(param)
		}
	}	
	var order_by = params.join(',');
	//console.log(order_by)
	return {
		'order_by': order_by
	};
}

const reset = (headers) => {
	for (var i = 0; i < headers.length; i++) {
		let header = headers[i];
		if (header['format'] !== 'action') {
			header['sort_on'] = false;
		}
	}
	return headers;
}

exports.get = get;
exports.reset = reset;