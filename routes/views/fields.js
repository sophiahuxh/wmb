var keystone = require('keystone');
// var express = require('express');
// var fs = require('fs');
// var router = express.Router();

// var shipData = require('././db/ships.json');
// var jsonfile = require('jsonfile'); 
// var file = '././jsgrid-admin/db/ships.json';
// var Datastore = require('nedb');
// var db = new Datastore();
// db.insert(shipData);

// var prepareItem = function(source) {
//     var result = source;
//     return result;
// };

// var keystone = require('keystone');

exports = module.exports = function (req, res) {
    var view = new keystone.View(req, res);
    var locals = res.locals;

    locals.data = {
        tables: [],
        columns: [],
    };

    // console.log('req.body is ', req.body);
    // console.log('req.query is ', req.query);

    var db = req.db;

    view.on('init', function (next) {

            var collection = db.get('tables');
            collection.findOne({'table_name': '新总表'},{},function(e,docs){
                locals.data.table = docs;
                // console.log('locals.data.table is: ', locals.data.table);
                next(e);  
            });
    });

    view.render(function(err) {
        if (err) return res.apiError('error', err);

            var collection = db.get('columns');
            keystone.list('Column').model.find({'table_name': locals.data.table._id},{name:1, type:1, _id:0}).sort('column_display_order').exec(function (err, results)
            // collection.find({},{column_name:1, _id:0},function(e,docs)
            {
                var docs = results;  
                docs.push({ type: "control" });
                JSON.stringify(docs); 
                // console.log('docs is :',JSON.stringify(docs) );
                res.json(docs);   
            });
    });    
}