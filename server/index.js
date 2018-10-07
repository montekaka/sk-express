var express = require('express');
const axios = require('axios');
var bodyParser = require('body-parser');
const session = require('express-session');
var cors = require('cors');
var path = require('path');
const auth = require('./../resource/libs/helpers/auth.js');

const customAuth = {
  deviseURL: 'http://localhost:3000',
  deviseScope: 'v1',
  deviseFor: 'indicator',
};


var app = express();
app.use(cors())
app.use(bodyParser.json());
app.use(session({
  secret: 'shhh, it\'s a secret',
  resave: false,
  saveUninitialized: true
}));

// app.use(cookieSession({
//   name: 'react-sk-session',
//   keys: ['key1', 'key2']
// }));

const HEADERS = ['access-token', 'token-type', 'client', 'expiry', 'uid']

// Serve up the public folder since that's where our client bundle.js file will end up.
app.use(express.static(__dirname + '/../client/dist'));

app.get('/login', (req, res) => {
	var email = 'a@a.com';
	var password = '11111111';

	axios.post(customAuth.deviseURL+'/auth/sign_in', {
		email: email,
		password: password
	})
	.then((response) => {			
		//res.send({headers: response.headers, data: response.data.data});
		var user = {uid: response.headers['uid'], email: email, auth: true, 'access-token': response.headers['access-token'], client: response.headers['client'], expiry: response.headers['expiry']}				
		auth.createSession(req, res, user);
		//res.status(200).send(user);
	})
	.catch((error, response) => {
		res.send('error');
	})
});


app.get('/me', (req, res, next) => {
	// console.log(req.session.user);
	// res.send('hi')
	//res.redirect('/orders');
	// const token = req.headers;
	// console.log(token)
	// res.send(token);
	axios.get(customAuth.deviseURL+'/auth/validate_token', {
		headers: req.session.user
	})
	.then((response) => {
		//console.log(response.data)
		//console.log(response.headers['uid'])
		res.send('yeah');
	})
	.catch((error) => {
		res.send('gged');
	})
})



// always redirect back to solve the react-router issue
// https://tylermcginnis.com/react-router-cannot-get-url-refresh/

app.get('/*', (req, res) => {
	res.sendFile(path.join(__dirname , '/../client/dist/index.html'), (err) => {
		if (err) {
			res.status(500).send(err);
		}
	})
})

app.listen(4200, function() {
  console.log('listening on port 4200!');
});

