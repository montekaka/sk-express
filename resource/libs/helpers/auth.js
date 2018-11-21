const axios = require('axios');
const $ = require('jquery');
const Auth = require('j-toker');
const config = require('./../../config.js');
const base_url = config.base_url;

// auth for express server
var createSession = (req, res, newUser) => {
  return req.session.regenerate(function(err) {
      req.session['user'] = newUser;
      //res.redirect('/');
      res.status(200).send(newUser);
    });
};

var isLoggedIn = (req, res) => {
	console.log(req.session);
	return req.session ? !! req.session.user : false;
};

var checkUser = (req, res, next) => {
	if(!isLoggedIn(req)){
		res.redirect('/login');
	} else {
		next();
	}
}

// auth for react

$.auth.configure({apiUrl: base_url});

var signIn = (user, cb) => {
	//const user = {email: 'a@a.com', password: 11111111}
	// console.log(base_url);
	Auth.emailSignIn({
	  email: user.email,
	  password: user.password
	 })
	.then((res) => {
		cb(res.data, true);
		//return user = res.data;
	})
	.catch((err) => {
		cb(null, false);
	})
}

var signOut = (cb) => {	
	$.auth.signOut();
	cb(null, false);
}

var validateToken = (cb) => {
	Auth.validateToken()
	.then((user) => {
		cb(user, true);
	})
	.catch((err) => {
		cb(null, false);
	})
}

exports.createSession = createSession;
exports.isLoggedIn = isLoggedIn;
exports.checkUser = checkUser;
exports.signIn  = signIn;
exports.validateToken = validateToken;
exports.signOut = signOut;