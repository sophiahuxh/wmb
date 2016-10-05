var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Usergroup Model
 * ==========
 */
var Usergroup = new keystone.List('Usergroup', {
	map: { name: 'user_group_id' },
	autokey: { from: 'user_group_id', path: 'key', unique: true },
});

Usergroup.add({
	user_group_id:          { type: String},
	user_group_code:    	{ type: Types.Relationship, ref: 'Access_code', filters: {access_type: 'usergroup'}},
	access_type:  			{ type: Types.Select, options: 'table, column'},
	access_code: 			{ type: Types.Relationship, ref: 'Access_code', filters: {access_type: ':access_type'}},
});

// Access_code.relationship({ ref: 'Access_code', path: 'access_codes', refPath: 'access_code'});
/**
 * Registration
 */
Usergroup.defaultColumns = 'user_group_id, user_group_code, access_type, access_code';
Usergroup.register();
