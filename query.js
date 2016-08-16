/*######################################################################################################################							   				
DESCRIPTION : query.js File which queries the database and returns the results										   
																													   	
Created / Last Modified	by	|	Date			|Comments			   										
__________________________________________________________________________________
Dinesh						|	07/29/2016		| Initial Release
							|					|
							|					|

########################################################################################################################*/
//exporting the entire program to be called from other program
exports.query= function(collection){
//declaring required modules 
	
//	var router = require('D:/nodebackup/nodejs/datahub/index.js');
	var db = require ('./dbconnection.js');
	var path = require('path');
	var fs = require('fs');
//logging the confirmation
	console.log('we are in query part');
	var collection = db.get(collection);
//performing the actual query
	collection.find({},function(err,docs){
//logging the results
		
		console.log(docs);
		
		//console.log(result);
//stringifying the result to send across to the client	
	//var result = JSON.stringify(docs);
//writing the result to a file	
	//fs.writeFile(path.join(__dirname+'/views/result.ejs'),result);
	})
	
}
