var keystone = require('keystone');
var _ = require('underscore');
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

    // console.log('req.body is ', req.body);
    // console.log('req.query is ', req.query);

    var db = req.db;
    var item = req.body;
    // console.log('In ship.js query table_name', req.query.table_name);
    var collection = db.get(req.query.table_name);




    var getShipFilter = function(query) {
        // console.log('request query columns in filter is: ', query.columns);

        var req_columns = JSON.parse(query.columns);

        // console.log('req_columns is: ', req_columns);

        var column_names = _.without(_.pluck(req_columns, 'name'),undefined);

        // console.log('column_names is: ', column_names);

        var result = {};

        _.each(column_names, function(column_name, index){
                // console.log(index + ' : ' + column_name);
                    if(query[column_name] == ''){
                        // console.log('ignore search column: ', query[column_name]);
                    }else{
                        result[column_name] = new RegExp(query[column_name],"i");
                    }
        });

       

        // var result = {};
        // result["填写日期"] = new RegExp(query["填写日期"],"i");
        // result["我司对外型号"] = new RegExp(query["我司对外型号"],"i");
        // result["供应商"] = new RegExp(query["供应商"],"i");
        // result["中文简述"] = new RegExp(query["中文简述"],"i");
        // result["原厂型号"] = new RegExp(query["原厂型号"],"i");
        // result["对外品牌"] = new RegExp(query["对外品牌"],"i");

        // result["描述"] = new RegExp(query["描述"],"i");
        // // result["电压"] = new RegExp(query["电压"],"i");
        // result["类型"] = new RegExp(query["类型"],"i");
        // result["颜色"] = new RegExp(query["颜色"],"i");
        // // result["封装"] = new RegExp(query["封装"],"i");
        // // result["亮度"] = new RegExp(query["亮度"],"i");


        // // result["波长（nm)或色温"] = new RegExp(query["波长（nm)或色温"],"i");


        // result["采购价格"] = new RegExp(query["采购价格"],"i");
        // result["对Toplight人民币"] = new RegExp(query["对Toplight人民币"],"i");
        // result["对Toplight美金"] = new RegExp(query["对Toplight美金"],"i");
        // result["邮件日期"] = new RegExp(query["邮件日期"],"i");
        // result["备注"] = new RegExp(query["备注"],"i");
        // result["数字金额排序测试"] = new RegExp(query["数字金额排序测试"],"i");
        // // var result = {"我司对外型号":new RegExp(query["我司对外型号"],"i") , "供应商":new RegExp(query["供应商"],"i") , "中文简述":new RegExp(query["中文简述"],"i")};
        console.log('db search query is: ', result);
        return result;
    };

    // var replaceBreakline = function(item) {
    //     var test=(item.Product_desc).replace(/\\r\\n/g, '<br />');
    //     var result = {
    //         Ship_date:      item.Ship_date,
    //         Courier:        item.Courier,
    //         Tracking_id:    item.Tracking_id,
    //         Supplier:       item.Supplier,
    //         Product_id:     item.Product_id,
    //         Product_desc:   test,
    //         Picture:        item.Picture
    //     };

    //     return result;
    // };

    view.render(function(err) {

        if (err) return res.apiError('error', err);
        
        if(req.method == 'GET'){
            // var db = req.db;
            // var collection = db.get('新总表');
            // collection.find({},{},function(e,docs){
            collection.find(getShipFilter(req.query),{},function(e,docs){
                JSON.stringify(docs);  
                // console.log('find docs is :',JSON.stringify(docs) );
                res.json(docs);   
            });
        };
    });

    view.render(function(err) {
        // console.log('req.method in POST render is: ', req.method);
         if (err) return res.apiError('error', err);
         if(req.method == 'POST'){
             // var db = req.db;
             // var item = req.body;
             // var collection = db.get('ships');
             collection.insert(item,{},function(e,docs){
                // console.log('docs is', JSON.stringify(docs)); 
                // console.log('in POST render req.user is', req.user.email); 
                if (e) {
                    return res.apiError('error:', e);
                }
                else{
                    JSON.stringify(docs);  
                    // console.log('insert docs is :',JSON.stringify(docs) );
                    res.json(docs); 
                }  
            });
        };
    });

    view.render(function(err) {
        // console.log('req.method in PUT render is: ', req.method);
         if (err) return res.apiError('error', err);
         if(req.method == 'PUT'){
                // console.log(req.body);
                // console.log(item._id);
                item = req.body;
                // var test=(item.Product_desc).replace(/\\r\\n/g, '<br />');
                // console.log('test is ', test.tostring());
                collection.update({'_id': item._id},item,function(e,docs){
                // console.log('update item is', JSON.stringify(item)); 
                // console.log('update docs is :',JSON.stringify(docs) );
                JSON.stringify(docs);  
                res.json(item);  
            });

        };
    });

    view.render(function(err) {
        // console.log('req.method in DELETE render is: ', req.method);
         if (err) return res.apiError('error', err);
         if(req.method == 'DELETE'){
                // var sophiatestdb = req.db;
                // console.log('sophiatestdb is ', sophiatestdb);
                // var collection = sophiatestdb.get('ships');
                collection.remove({'_id': item._id},{},function(e,docs){
                // console.log('delete item is', JSON.stringify(item)); 
                // console.log('delete docs is :',JSON.stringify(docs) );
                JSON.stringify(item);  
                res.json(item);   
            });
        };
    });
}