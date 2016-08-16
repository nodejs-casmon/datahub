/*######################################################################################################################							   				
DESCRIPTION : Checks the presence of collections in databases

Created / Last Modified	by	|	Date			|Comments			   				
__________________________________________________________________________________
Dinesh						|	07/29/2016		| Initial Release
							|					|
							|					|

########################################################################################################################*/

module.exports = {
Identify : function (collection,callback){
var Q = require('q');
	var deferred = Q.defer();
//declaring array consisting of collections in our database
Mongo = ['companies','city','chicago','chennai','Restaurants'];
//checking the index of the requested collection

	if(Mongo.indexOf(collection) < 0) {
	deferred.reject ("NotMongoDb");
}
else 
{
	deferred.resolve("MongoDb");
}
deferred.promise.nodeify(callback);
return deferred.promise;
}
}