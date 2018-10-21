var express = require('express');
var path = require('path');

var app = express();

// app.use(cookieSession({
//   name: 'react-sk-session',
//   keys: ['key1', 'key2']
// }));

const HEADERS = ['access-token', 'token-type', 'client', 'expiry', 'uid']

// Serve up the public folder since that's where our client bundle.js file will end up.
app.use(express.static(__dirname + '/../client/dist'));

// always redirect back to solve the react-router issue
// https://tylermcginnis.com/react-router-cannot-get-url-refresh/

app.get('/*', (req, res) => {
	res.sendFile(path.join(__dirname , '/../client/dist/index.html'), (err) => {
		if (err) {
			res.status(500).send(err);
		}
	})
});



app.listen(4200, function() {
  console.log('listening on port 4200!');
});

