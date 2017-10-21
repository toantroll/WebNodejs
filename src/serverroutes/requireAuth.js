//auth router
var express = require('express');
var app     = express();
var router  = express.Router();
import user from '../model/user';//get data test
import jwt from'jsonwebtoken';
import config from '../config';
import escapeUrl from '../escapeUrl'

router.use(function(req, res, next) { // run for any & all requests
    console.log(req.baseUrl); // set up logging for every API call
    next(); // ..to the next routes from here..
});

router.route('/*')
	.post(function(req, res, next) {
		if(req.baseUrl === '/login' && escapeUrl.find(function(url){ return req.baseUrl.includes(url)})){
			next();
		}else {
		// check header or url parameters or post parameters for token
		var token = req.body.token || req.query.token || req.headers['x-access-token'];
		if (token) {
			console.log(token);
			// verifies secret and checks exp
		   jwt.verify(token, config.secret, function(err, decoded) {      
			  if (err) {
				//return res.json({ success: false, message: 'Failed to authenticate token.' });   
				res.redirect('/login');	
			  } else {
				// if everything is good, save to request for use in other routes
				req.decoded = decoded;
				var name = decoded.name;
				//auth
				var userAuth = user.find(function(user){
					return user.name === name;
				});
				//check user
				if(userAuth){
					next();
				} else {
					res.redirect('/login');
				}
			  }
			});

		  } else {
			res.redirect('/login');
		  }
		}
	})
	.get(function(req, res, next) {
		if(req.baseUrl === '/login' && escapeUrl.find(function(url){ return req.baseUrl.includes(url)})){
			next();
		} else {
		// check header or url parameters or post parameters for token
		var token = req.body.token || req.query.token || req.headers['x-access-token'];
		if (token) {
			console.log(token);
			// verifies secret and checks exp
		   jwt.verify(token, config.secret, function(err, decoded) {      
			  if (err) {
				//return res.json({ success: false, message: 'Failed to authenticate token.' });   
				res.redirect('/login');	
			  } else {
				// if everything is good, save to request for use in other routes
				req.decoded = decoded;
				var name = decoded.name;
				//auth
				var userAuth = user.filter(function(user){
					if(user.name === name){
						return user;
					}
				});
				//check user
				if(userAuth){
					next();
				} else {
					res.redirect('/login');
				}
			  }
			});

		  } else {
			res.redirect('/login');
		  }
		}
	});
module.exports = router;