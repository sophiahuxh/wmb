var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Column_access Model
 * ==========
 */
var Column_access = new keystone.List('Column_access', {
	map: { name: 'column_access_id'},
	autokey: { from: 'column_access_id', path: 'key', unique: true },
});

Column_access.add({
	column_access_id:       { type: String},
	column_access_code:    	{ type: Types.Relationship, ref: 'Access_code', filters: {access_type: 'column'}},
	table_name:  			{ type: Types.Relationship, ref: 'Table'},
	column_name: 			{ type: Types.Relationship, ref: 'Column', filters: {table_name: ':table_name'} },
	is_access:      		{ type: Boolean, label: 'Can access this column'},
});

// Table.relationship({ ref: 'Table', path: 'tables', refPath: 'table_name'});
// Column.relationship({ ref: 'Column', path: 'columns', refPath: 'column_id'});
// Access_code.relationship({ ref: 'Access_code', path: 'access_codes', refPath: 'access_code'});

/**
 * Registration
 */
Column_access.defaultColumns = 'column_access_id, column_access_code, table_name, column_name,is_access';
Column_access.register();
