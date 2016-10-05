var keystone = require('keystone');

exports = module.exports = function (req, res) {
    var view = new keystone.View(req, res);

    var db = req.db;
    var p_n = req.query.id;
    console.log('In detail.js query id', req.query.id);
    console.log('In detail.js query id', req.query.table_name);

    var collection = db.get(req.query.table_name);    

    view.render(function(err) {

        if (err) return res.apiError('error', err);
        
        if(req.method == 'GET'){
            // var db = req.db;
            // var collection = db.get('新总表');
            // collection.find(getShipFilter(req.query),{},function(e,docs){
            collection.findOne({'P/N': p_n},{},function(e,docs){
                JSON.stringify(docs);  
                // console.log('find docs in detail js is  :',JSON.stringify(docs) );
                res.json(docs);   
            });
        };
    });
    
}