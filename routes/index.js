var express = require ('express');
var parameter = require('/home/dbadmin/datahub/parameter.js');
var database = require('/home/dbadmin/datahub/dbconnection.js');
var perform = require ('/home/dbadmin/datahub/query.js');
var async = require('async');
var path = require('path');
var fs = require ('fs');
//var result = require('D:/nodebackup/nodejs/datahub/query.js');

var router = express.Router();
router.use(function(req, res, next) {
  console.log('Something is happening.');
  next();
});
router.get('/:collection',function(req,res){
	var collection = req.params.collection;
	
	async.waterfall([
		function(callback){
			var present = parameter.check(collection);
			callback(null,present);
},
		function(present,callback){
			if (present==1){
				database.connection();
				//perform.query(collection)
							
;}
			else{
				res.send('collection not found');
	}
		callback(null,'1');
},
		function(response,end){
		var db = require ('/home/dbadmin/datahub/dbconnection.js');
		var collections = db.collection(collection);
		collections.find({},function(err,docs){
		console.log(docs);
		res.json(docs);
		})
		//res.json(path.join(__dirname+'/views/result.ejs'));	
	}],
		function(err,res){
			console.log('query is completed');
})

});
module.exports = router;
