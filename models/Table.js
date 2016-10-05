var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Table Model
 * ==========
 */
var Table = new keystone.List('Table', {
	map: { name: 'table_name' },
	autokey: { from: 'table_id', path: 'key', unique: true },
});

Table.add({
	table_id:           { type: String},
	table_name:        	{ type: String},
	table_description: 	{ type: String}, 
});


// Table.schema.post('save', function() {
// 	var name = this.table_name;
// 	console.log('post save: add a table: ', name);
// 	exports.create = {
// 		name: [ ],
// 	};
// 	console.log('err is no error. ')
// 	// keystone.list(table.table_name).model.count().exec(function(err, count) {
// 	// 	console.log('err is: ',err);
// 	// 	console.log('count is: ', count);
// 	// 		if (count == 0 ) console.log('count == 0') ;
// 	// 	});
// });


Table.relationship({ ref: 'Column', path: 'columns', refPath: 'table_name'});
Table.relationship({ ref: 'Table_access', path: 'table_accesses', refPath: 'table_name'});
/**
 * Registration
 */
Table.defaultColumns = 'table_id, table_name, table_description';
Table.register();
