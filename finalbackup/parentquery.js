/*######################################################################################################################							   				
DESCRIPTION : Querying the collection to find unique document

Created / Last Modified	by	|	Date			|Comments			   				
__________________________________________________________________________________
Dinesh						|	08/05/2016		| Initial Release
							|					|
							|					|

########################################################################################################################*/
module.exports = {
	find : function(collection,name,callback){

//declaring required modules 
	var Q = require('q');
	//deferred holds value of asynchronous operation
	var deferred = Q.defer();
	var db = require ('./dbconnection.js');
	var path = require('path');
	var fs = require('fs');
//logging the confirmation
	console.log('we are in query part');
	var collection = db.get(collection);
//performing the actual query
	collection.find({"name":name},function(err,docs){
		console.log('we are in the find part');
//logging the results
	if(err){
		console.log(err);
	}
	//Resolve represents a promise that is successfull
	deferred.resolve(docs);

	})
	//returning value
	return deferred.promise;

}
}