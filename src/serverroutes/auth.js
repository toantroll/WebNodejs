//auth router
var express = require('express');
var app     = express();
var router  = express.Router();
import user from '../model/user';//get data test
import jwt from'jsonwebtoken';
import config from '../config';
import UserDocument from '../documentacess/userDocument';

router.use(function(req, res, next) { // run for any & all requests
    console.log("Connection to the AUTH"); // set up logging for every API call
    next(); // ..to the next routes from here..
});

router.route('/auth') // on routes for /This
    .post(function(req, res) {
        var data = req.body;
        const userDocument = new UserDocument();
		if(data.loginName && data.password){
      let user = {};
      userDocument.findByUserNameAndPassword(data.loginName, data.password).then(function(result){
        user = result;
        if(user.user_name != undefined){
           // create a token
          var token = jwt.sign(user, config.secret, {
            expiresIn: "2d"
          });
            res.cookie(config.cookieKey, token, { maxAge: 86400000*2, httpOnly: true });
            res.json({auth: true, message: 'success', token: token});

        } else {
          res.json({auth: false, message:'account not exist'});
        }
      }).catch(function(e){res.json({auth: false, message:'account not exist'});return;});
		} else {
			res.json({auth: false, message:'fill all data'});
		}
    });
// 	router.route('/auth')
// 		.get(function(req, res, next) {
// 		// check header or url parameters or post parameters for token
// 		var token = req.body.token || req.query.token || req.headers['x-access-token'];
//
// 		if (token) {
// console.log(token);
//     // verifies secret and checks exp
//    jwt.verify(token, config.secret, function(err, decoded) {
//       if (err) {
//         //return res.json({ success: false, message: 'Failed to authenticate token.' });
//         res.redirect('/login');
//       } else {
//         // if everything is good, save to request for use in other routes
//         req.decoded = decoded;
// 		return res.json(decoded);
//       }
//     });
//
//   } else {
//
//     // if there is no token
//     // return an error
//     return res.status(403).send({
//         success: false,
//         message: 'No token provided.'
//     });
//
//   }
// 	});

module.exports = router;
