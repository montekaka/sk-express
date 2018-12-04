const skState = {
	alert: {
		message: function(action, object) {
			return `${object} ${action}`
		},
		link: ''
	}
}

exports.skState = skState;
