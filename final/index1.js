/*######################################################################################################################                                            
DESCRIPTION : Setting up the server and identifying the route files

Created / Last Modified by  |   Date            |Comments                           
__________________________________________________________________________________
suresh                      |   08/03/2016      | Initial Release
                            |                   |
                            |                   |

########################################################################################################################*/

//calling the erquired modules
var express = require('express');
var router = express.Router();
var database = require('./dbconnection.js');
var fs = require("fs");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('hi');
});


/* POST */
router.post('/:collection', function(req, res) {
    
    var collection = req.params.collection;
    var db = require ('./dbconnection.js');
    var collection = db.get(collection);
    // Get content from file
    if(req.method=='POST')
	{
	req.on('data',function(data)
		{
	var buf=new Buffer(data);
	var json=JSON.stringify(buf);
	var str =buf.toString();
	var jsonContent = JSON.parse(str);
	collection.insert(jsonContent,function(e,docs){
	res.send(docs);	
	console.log("inserted");	       });
		});
	}
});    
   


/* DELETE */
router.get('/DELETE', function(req, res) {
    var db = require ('./dbconnection.js');
    var collection = db.get('companies');
    // Get content from file
    var contents = fs.readFileSync("jsondeletecontent.json");
    // Define to JSON type
    var jsonContent = JSON.parse(contents);

    collection.remove(jsonContent,function(e,docs){
        res.send(docs);
    });
});

/* GET stop page. */
router.get('/STOP', function(req, res, next) {
  res.send('Service stopped!!!');
  process.exit();
});

module.exports = router;
