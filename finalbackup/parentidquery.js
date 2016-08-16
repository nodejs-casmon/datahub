module.exports = {
	find : function(collection,names,parentresource,parentid,callback){

//declaring required modules 
	var Q = require('q');
	var deferred = Q.defer();
	var db = require ('./dbconnection.js');
	var path = require('path');
	var fs = require('fs');
	var name = {};
	name["name"]=names;
	var object = {};
	var key = parentresource + "." +"title"
	object[key] = parentid;
	projection = parentresource + "." + "$" + ":" + 1;
//logging the confirmation
	console.log('we are in query part');
	var collection = db.get(collection);
//performing the actual query
	console.log('we are in find part');
	collection.find({$and:[object,name]},projection,function(err,docs){
//logging the results
	deferred.resolve(docs);
	})
	//returning the value
	return deferred.promise;

}
}