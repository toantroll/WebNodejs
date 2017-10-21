//auth router
var express = require('express');
var app     = express();
var router  = express.Router();
import user from '../model/user';//get data test
import jwt from'jsonwebtoken';
import config from '../config';
import userDocument from '../documentacess/userDocument';

router.use(function(req, res, next) { // run for any & all requests
    console.log("Connection to the AUTH"); // set up logging for every API call
    next(); // ..to the next routes from here..
});

router.route('/auth') // on routes for /This
    .post(function(req, res) {
        var data = req.body;
        console.log(data);
        const userAccess = new userDocument();
		if(data.loginName && data.password){
      const user = userAccess.findByUserNameAndPassword(data.loginName, data.password);
      console.log(user);
			if(user){
				 // create a token
				var token = jwt.sign(user, config.secret, {
					expiresIn: 1440 // expires in 24 hours
				});
					res.cookie(config.cookieKey, token, { maxAge: 900000, httpOnly: true });
					res.json({auth: true, message: 'success', token: token});
          console.log(config.cookieKey);
					//res.redirect('/dashboard');
			} else {
				res.json({auth: false, message:'account not exist'});
			}
		} else {
			res.json({auth: false, message:'fill all data'});
		}
    });
	router.route('/auth')
		.get(function(req, res, next) {
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
		return res.json(decoded);
      }
    });

  } else {

    // if there is no token
    // return an error
    return res.status(403).send({
        success: false,
        message: 'No token provided.'
    });

  }
	});

module.exports = router;