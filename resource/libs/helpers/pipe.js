var moment = require('moment');

var actions = {
	'date': function(x){
		return moment(x).format("DD-MM-YYYY")
	},
	'currency': function(x){
		return "$ "+(x ? x : 0) ;
	},
	'number': function(x){
		return x ? x : 0 ;
	},	
	'boolean': function(x){
		return x;
	},
	'string': function(x){
		return x ? x : "";
	}
}

exports.actions = actions;