var moment = require('moment');

var actions = {
	'date': function(x){
		return moment(x).format("DD-MM-YYYY")
	},
	'currency': function(x){
		return "$"+x;
	},
	'boolean': function(x){
		return x;
	},
	'string': function(x){
		return x;
	}
}

exports.actions = actions;