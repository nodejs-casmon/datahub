/*######################################################################################################################							   				
DESCRIPTION : Establishing a connection to the database

Created / Last Modified	by	|	Date			|Comments			   				
__________________________________________________________________________________
Dinesh						|	07/29/2016		| Initial Release
							|					|
							|					|

########################################################################################################################*/
//importing required modules 
var monk = require('monk');
//forming db connection
var db = monk('localhost:27017/datahub');
//exporting the db connection to be used in other files
module.exports = db;
