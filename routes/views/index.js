var keystone = require('keystone');
var _ = require('underscore');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;
	// console.log('index req.user is: ', req.user);
	
	locals.data = {
		posts: [],
	};

	locals.data.user = req.user;
	// locals.section = 'home';
	// console.log(req.query.table_name);
	
	if(req.query.table_name == undefined){
		locals.data.inqurytable='新总表'
	}else{
		locals.data.inqurytable = req.query.table_name;
	}

	// Load the table details 
	view.on('init', function (next) {
		
		keystone.list('Table').model.findOne({ table_name: locals.data.inqurytable }).exec(function (err, result) {
			locals.data.table = result;
			// console.log('table details are : ', locals.data.table);
			next(err);		
		});
	});

	// Load the usergroup details 
	view.on('init', function (next) {
		
		keystone.list('Usergroup').model.find({ user_group_code: locals.data.user.user_group }).exec(function (err, result) {
			locals.data.usergroups = result;
			// console.log('locals.data.usergroups is: ', locals.data.usergroups);
			next(err);		
		});
	});

	// Load the table access_code details 
	view.on('init', function (next) {

		var cond = _.pluck(_.where(locals.data.usergroups, {access_type:'table'}),'access_code');
		// console.log('cond is: ', cond);

		var q=keystone.list('Table_access').model.findOne({ table_access_code: {$in: cond}, table_name: locals.data.table._id});
		q.exec(function (err, result) {
			locals.data.table_accesses = JSON.stringify(result);
			locals.table_accesses = result;
			// console.log('locals.data.table_accesses is: ', locals.data.table_accesses);
			next(err);		
		});
	});


	// Load the table access_code details 
	view.on('init', function (next) {

		var cond = _.pluck(_.where(locals.data.usergroups, {access_type:'table'}),'access_code');
		// console.log('cond is: ', cond);

		var q=keystone.list('Table_access').model.find({ table_access_code: {$in: cond}});
		q.exec(function (err, result) {
			locals.data.table_ids = result;
			// console.log('locals.data.table_ids is: ', locals.data.table_ids);
			next(err);		
		});
	});


	// Load the table details 
	view.on('init', function (next) {

		var cond = _.pluck(locals.data.table_ids,'table_name');
		// console.log('cond is: ', cond);

		var q=keystone.list('Table').model.find({ _id: {$in: cond}});
		q.exec(function (err, result) {
			locals.data.tables = result;
			// console.log('locals.data.tables is: ', locals.data.tables);
			next(err);		
		});
	});

	// Load the column access_code count details 
	view.on('init', function (next) {

		var cond = _.pluck(_.where(locals.data.usergroups, {access_type:'column'}),'access_code');
		// console.log('cond is: ', cond);

		var q=keystone.list('Column_access').model.find({ column_access_code: {$in: cond}, table_name:locals.data.table._id, is_access: false});
		q.exec(function (err, result) {
			locals.data.exclude_columns = result;
			// console.log('locals.data.exclude_columns is: ', locals.data.exclude_columns);
			next(err);		
		});
	});


	// Load the jsgrid column details 
	view.on('init', function (next) {

		var cond = _.pluck(locals.data.exclude_columns,'column_name');
		// console.log('cond is: ', cond);

		keystone.list('Column').model.find({table_name: locals.data.table._id, _id:{$nin: cond}},{name:1, type:1, _id:0}).sort('column_display_order').exec(function (err, results){
                locals.data.columns = results;
                var docs = results;  
                // console.log('locals.table_accesses.is_delete is: ', locals.table_accesses.is_delete);
                if(locals.table_accesses.is_delete){
					docs.push({ type: "control" });
                }else{
                	docs.push({ type: "control", deleteButton: false });
                }
                locals.data.fields = JSON.stringify(docs); 
                // console.log(locals.data.fields);
                next(err);
        });
	});

	// Render the view
	view.render('index');
};
