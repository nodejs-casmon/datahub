/*######################################################################################################################							   				
DESCRIPTION : query.js File which queries the database and returns the results										   
																													   	
Created / Last Modified	by	|	Date			|Comments			   										
__________________________________________________________________________________
Dinesh						|	07/29/2016		| Initial Release
							|					|
							|					|

########################################################################################################################*/
//exporting the entire program to be called from other program
module.exports = {
	query:function(collection,callback){

//declaring required modules 
	var Q = require('q');
	var deferred = Q.defer();
	var db = require ('./dbconnection.js');
	var path = require('path');
	var fs = require('fs');
//logging the confirmation
	console.log('we are in query part');
	var collection = db.get(collection);
//performing the actual query
	collection.find({},function(err,docs){
//logging the results
	console.log('we are in find part');
	if(err){
		console.log(err);
	}
	//Resolve is performed if the query is sucessful
	deferred.resolve(docs);
	})
	//returning the result
	return deferred.promise;
		
	}
}
	

