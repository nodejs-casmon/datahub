/*######################################################################################################################							   				
DESCRIPTION : Setting up the server and identifying the route files

Created / Last Modified	by	|	Date			|Comments			   				
__________________________________________________________________________________
Dinesh						|	07/29/2016		| Initial Release
							|					|
							|					|

########################################################################################################################*/

var express = require('express');
var app = express();
var port = 3456;

//Including file to route requests
var routes = require('./index.js');
app.use('/',routes);

// Initialising node js server
app.listen(port); 

console.log('listening on port ' + port);
