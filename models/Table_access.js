var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Table_access Model
 * ==========
 */
var Table_access = new keystone.List('Table_access', {
	map: { name: 'table_access_id' },
	autokey: { from: 'table_access_id', path: 'key', unique: true },
});

Table_access.add({
	table_access_id:            { type: String},
	table_access_code:           { type: Types.Relationship, ref: 'Access_code', filters: {access_type: 'table'}},
	table_name:        			{ type: Types.Relationship, ref: 'Table'},
	is_view:                    { type: Boolean, label: 'Can view table'},
	is_insert: 					{ type: Boolean, label: 'Can insert table'},
	is_edit: 					{ type: Boolean, label: 'Can edit table'},
	is_delete: 					{ type: Boolean, label: 'Can delete table'},
});

// Access_code.relationship({ ref: 'Access_code', path: 'access_codes', refPath: 'access_code'});

/**
 * Registration
 */
Table_access.defaultColumns = 'table_access_id, table_access_code, table_name, is_view, is_insert, is_edit, is_delete';
Table_access.register();
