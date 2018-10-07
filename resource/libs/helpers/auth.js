const axios = require('axios');

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

exports.createSession = createSession;
exports.isLoggedIn = isLoggedIn;
exports.checkUser = checkUser;

