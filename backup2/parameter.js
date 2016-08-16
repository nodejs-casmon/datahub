/*######################################################################################################################							   				
DESCRIPTION : Checks the presence of collections in databases

Created / Last Modified	by	|	Date			|Comments			   				
__________________________________________________________________________________
Dinesh						|	07/29/2016		| Initial Release
							|					|
							|					|

########################################################################################################################*/

exports.check = function (collection){
//declaring array consisting of collections in our database
Mongo = ['companies','bolo','fhfhfh','empdet','test'];
//checking the index of the requested collection
if(Mongo.indexOf(collection) < 0) {
	return 0;
}
else 
{
	return 1;
}
}