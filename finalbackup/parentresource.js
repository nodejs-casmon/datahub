/*######################################################################################################################							   				
DESCRIPTION : Querying the collection to find unique document

Created / Last Modified	by	|	Date			|Comments			   				
__________________________________________________________________________________
Dinesh						|	08/05/2016		| Initial Release
							|					|
							|					|

########################################################################################################################*/
module.exports = {
	find : function(collection,names,parentresource,callback){

//declaring required modules 
	var Q = require('q');
	var deferred = Q.defer();
	var db = require ('./dbconnection.js');
	var path = require('path');
	var fs = require('fs');
	var name = {};
	name["name"]=names;
	var parentObject = {};
	parentresource[parentresource] = {$exists:true};
//logging the confirmation
	console.log('we are in query part');
	var collection = db.get(collection);
//performing the actual query
	console.log('we are in findsss part');
	collection.find({$and:[parentObject,name]},parentresource,function(err,docs){
//logging the results
	if(err){
		console.log(err);
	}
	deferred.resolve(docs);
	})
	//returning the value
	return deferred.promise;

}
}