/*######################################################################################################################							   				
DESCRIPTION : Setting up the server and identifying the route files

Created / Last Modified	by	|	Date			|Comments			   				
__________________________________________________________________________________
suresh						|	08/03/2016		| Initial Release
							|					|
							|					|

########################################################################################################################*/

//calling the required modules
var express = require('express');

var port =5678;

var routes = require('./index1');

var app = express();

// Listen to this Port
app.listen(port,function(){
  console.log("Live at Port"+port);
});

app.use('/', routes);

module.exports = app;
