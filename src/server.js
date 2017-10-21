'use strict';

import path from 'path';
import { Server } from 'http';
import Express from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { match, RouterContext } from 'react-router';
import routes from './routes';
import NotFoundPage from './components/NotFoundPage';
import auth from './serverroutes/auth';
import GetRoutes from './serverroutes/get_routes';
import CoreApi from './serverroutes/api_routes';
import Cookies from 'cookies';

//auth require
import user from './model/user';//get data test
import jwt from'jsonwebtoken';
import config from './config';
import escapeUrl from './escapeUrl'

// initialize the server and configure support for ejs templates
const app = new Express();
const server = new Server(app);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// define the folder that will be used for static assets
app.use(Express.static(path.join(__dirname, 'static')));
//require auth
app.use('*', (req, res, next) =>{
		var flag = escapeUrl.find(function(url){ return req.baseUrl.includes(url)});
		if(!flag){
			next();
		}else {
			console.log(req.baseUrl+' escaped');
		// check header or url parameters or post parameters for token
			//var token = cookies.get(config.cookieKey);

			var token = req.body.token || req.query.token || req.headers['x-access-token'];
			console.log(token);
			if (token) {
				// verifies secret and checks exp
			   jwt.verify(token, config.secret, function(err, decoded) {
				  if (err) {
						console.log(err);
					return res.json({ success: false, message: 'Failed to authenticate token.' });
					//res.redirect('/login');
				  } else {
					// if everything is good, save to request for use in other routes
					req.decoded = decoded;
					var name = decoded.name;
					next();
					//auth
					// var userAuth = user.find(function(user){
					// 	return user.name === name;
					// });
					// //check user
					// if(userAuth){
					// 	next();
					// } else {
					// 	//res.redirect('/login');
					// 	return res.json({ success: false, message: 'Failed to authenticate token.' });
					// }
				  }
				});

			} else {
				return res.json({ success: false, message: 'Failed to authenticate token.' });
				//res.redirect('/login');
			}
		}
	});

	//core api
	app.use('/api',CoreApi);
	//get api
	app.use('/get',GetRoutes);
	//

// universal routing and rendering
app.get('*', (req, res) => {
	console.log(req.url);
  match(
    { routes, location: req.url },
    (err, redirectLocation, renderProps) => {
      // in case of error display the error message
      if (err) {
        return res.status(500).send(err.message);
      }

      // in case of redirect propagate the redirect to the browser
      if (redirectLocation) {
        return res.redirect(302, redirectLocation.pathname + redirectLocation.search);
      }

      // generate the React markup for the current route
      let markup;
      if (renderProps) {
        // if the current route matched we have renderProps
        markup = renderToString(<RouterContext {...renderProps}/>);
      } else {
        // otherwise we can render a 404 page
        markup = renderToString(<NotFoundPage/>);
        res.status(404);
      }
			if(req.url.includes('admin/')){
				console.log('admin');
				// render the index template with the embedded React markup
	      return res.render('indexAdmin', { markup });
			} else {
				console.log('view:'+req.url);
				// render the index template with the embedded React markup
	      return res.render('indexView', { markup });
			}

    }
  );
});

	//app.use('*', requireAuth);
	//auth api
	app.use(auth);
// start the server
const port = process.env.PORT || 3000;
const env = process.env.NODE_ENV || 'production';
server.listen(port, err => {
  if (err) {
    return console.error(err);
  }
  console.info(`Server running on http://localhost:${port} [${env}]`);
});
