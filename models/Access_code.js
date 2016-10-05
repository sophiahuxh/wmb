var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Access_code Model
 * ==========
 */
var Access_code = new keystone.List('Access_code', {
	map: { name: 'access_code' },
	autokey: { from: 'access_id', path: 'key', unique: true },
});

Access_code.add({
	access_id:      { type: String},
	access_type:    { type: Types.Select, options: 'usergroup, table, column'},
	access_code:  	{ type: String},
});

Access_code.relationship({ ref: 'Usergroup', path: 'usergroups', refPath: 'user_group_code'});
Access_code.relationship({ ref: 'Usergroup', path: 'usergroups', refPath: 'acess_code'});
Access_code.relationship({ ref: 'Table_access', path: 'table_accesses', refPath: 'table_acess_code'});
Access_code.relationship({ ref: 'Column_access', path: 'column_accesses', refPath: 'column_access_code'});

/**
 * Registration
 */
Access_code.defaultColumns = 'access_id, access_type, access_code';
Access_code.register();
