module.exports = {
	find : function(collection,names,parentresource,parentid,childresource,childid,callback){

//declaring required modules 
	var Q = require('q');
	var deferred = Q.defer();
	var db = require ('./dbconnection.js');
	var path = require('path');
	var fs = require('fs');
	var name = {};
	var childquery = {};
	var key = parentresource + "." + parentid + "." + childresource  ;
	childquery[key]=childid;
	name["name"] = names;
	var projection = parentresource + "." + "$" + ":" + 1;
//logging the confirmation
	console.log('we are in query part');
	var collection = db.get(collection);
//performing the actual query
	console.log('we are in find part');
	collection.find({$and:[childquery,name]},projection,function(err,docs){
//logging the results
	deferred.resolve(docs);
	})
	deferred.promise.nodeify(callback);
	return deferred.promise;

}
}