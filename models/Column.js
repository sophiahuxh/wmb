var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Table Model
 * ==========
 */
var Column = new keystone.List('Column', {
	map: { name:'column_id'},
	autokey: { from: 'column_id', path: 'key', unique: true },
});

Column.add({
	column_id:    			{ type: String},
	table_name:    			{ type: Types.Relationship, ref: 'Table'},
	name:   				{ type: String},
	type:   				{ type: Types.Select, options: 'text, number, textarea, date, usmoney, cnymoney'}, 
	column_display_order: 	{ type: Number},
});

Column.relationship({ ref: 'Column_access', path: 'column_accesses', refPath: 'column_name'});

/**
 * Registration
 */
Column.defaultColumns = 'column_id, table_name, name, type, column_display_order';
Column.register();
