// Simulate config options from your production environment by
// customising the .env file in your project's root folder.
require('dotenv').config();

// Require keystone
var keystone = require('keystone');
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
// var ships = require('./routes/views/ship');
// var test = require('./routes/views/ships');
// var fields = require('./routes/views/fields');

var mongo = require('mongodb');
var monk = require('monk');
var db = monk(process.env.MONGO_URI);
var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// app.use(express.cookieParser('+crypto.randomBytes(64)+')); 
// app.use(express.session());
app.use(express.static(path.join(__dirname, 'public')));


app.use(function(req,res,next){
    req.db = db;
    next();
});

// app.use('/test', test);
// app.use('/ships', ships);
// app.use('/fields', fields);

// Initialise Keystone with your project's configuration.
// See http://keystonejs.com/guide/config for available options
// and documentation.

keystone.init({
	'name': 'jsgrid-keystone',
	'brand': 'jsgrid-keystone',

	'less': 'public',
	'static': 'public/image',
	'favicon': 'public/favicon.ico',
	'views': 'templates/views',
	'view engine': 'jade',

	'auto update': true,
	'session': true,
	'auth': true,
	'user model': 'User',
});

// Load your project's Models
keystone.import('models');

// Setup common locals for your templates. The following are required for the
// bundled templates and layouts. Any runtime locals (that should be set uniquely
// for each request) should be added to ./routes/middleware.js
keystone.set('locals', {
	_: require('lodash'),
	env: keystone.get('env'),
	utils: keystone.utils,
	editable: keystone.content.editable,
});

// Load your project's Routes
keystone.set('app', app);
keystone.set('routes', require('./routes'));

// Configure the navigation bar in Keystone's Admin UI
keystone.set('nav', {
	tables: ['tables', 'table_accesses'],
	columns: ['columns', 'column_accesses'],
	users: 'users',
	access_codes: 'access_codes',
	usergroups: 'usergroups',
});

keystone.set('signin redirect', function(user, req, res){
	console.log('user is ', user);
	if (!req.user.isAdmin) {
    	res.redirect('/');
  	}else{
  		res.redirect('/keystone');
  	};
});

// Start Keystone to connect to your database and initialise the web server

keystone.start();




