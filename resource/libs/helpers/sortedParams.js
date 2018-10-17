const _ = require('underscore');

const get = (headers) => {
	let params = {};
	headers.forEach((header) => {
		if (header.format !== 'action') {
			params[header.name] = header.sort_by
		}
	});
	return params;
}

exports.get = get;