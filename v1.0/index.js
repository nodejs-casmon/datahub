/*######################################################################################################################							   				
DESCRIPTION : Routing the requests to subfiles and serving different requests

Created / Last Modified	by	|	Date			|Comments			   				
__________________________________________________________________________________
Dinesh						|	08/05/2016		| Initial Release
							|					|
							|					|

########################################################################################################################*/
//declaring the required modules 
var express = require ('express');
var Datasource = require('./parameter.js');
var database = require('./dbconnection.js');
var async = require('async');
var router = express.Router();
var AllDocuments = require('./query.js');
var uniquedocument = require('./parentquery.js');
var parentquery = require('./parentresource.js');
var parentidquery = require('./parentidquery.js');
var childquery = require('./childquery.js');
/*handling the incoming routes which specifies only collection name
  and fetching all the documents in that collection */
router.get('/:collection',function(req,res)
{
	var collection = req.params.collection;
	//identifying the Datasource
	Datasource.Identify(collection).then(function(Datasource)
	{
	//Checking the DataSource 
		if (Datasource=="MongoDb")
		{
			//Calling the query function by passing collection as a parameter. Using Promises to control the program flow
			AllDocuments.query(collection).then(function(result)
			{
			//Sending response to Client in JSON format
			res.json(result);
			})
		}
		else {
			//Sending response to Client if Collection is Not Found
			res.send('Collection Not Found')
			 }
	})
});

//Handling the incoming routes which specifies a selection criteria, in this case calling it a parentresource

router.get('/:collection/:name',function(req,res)
{
	var collection = req.params.collection;
	var name = req.params.name;
	
	//using async function to control the flow of the program	
	Datasource.Identify(collection).then(function(Datasource)
	{
	//Checking the DataSource 
		if(Datasource=="MongoDb")
		{
			//Passing collection and parentresource as parameters to fetch the result 
			uniquedocument.find(collection,name).then(function(result)
			{
				//Serving the Client in JSON Format
				res.json(result);
			},function(err)
			{
				//Logging the Error To Console
				console.log(err);
			})

		}
	})
	
});

router.get('/:collection/:name/:parentresource',function(req,res)
{
	var collection = req.params.collection;
	var name = req.params.name;
	var parentresource = req.params.parentresource;
 	//using async function to control the flow of the program	
	Datasource.Identify(collection).then(function(Datasource)
	{	//Checking the DataSource 
		if(Datasource=="MongoDb")
		{
			//Passing Parameters to fetch the result
			parentquery.find(collection,name,parentresource).then(function(result)
			{
				//Serving the Client in JSON format
				res.json(result);
			},function(err)
			{
				//Logging the Error To Console
				console.log(err);
			})

		}
	})
	
});

//handling incoming routes retrieving using childid
router.get('/:collection/:name/:parentresource/:parentid',function(req,res)
{
	var collection = req.params.collection;
	var name = req.params.name;
	var parentresource = req.params.parentresource;
	var parentid= req.params.parentid;
	//using async function to control the flow of the program	
	Datasource.Identify(collection).then(function(Datasource)
	{
		//Checking The Datasource
		if(Datasource=="MongoDb")
		{
			//Passing Parameters to fetch the result
			parentidquery.find(collection,name,parentresource,parentid).then(function(result)
			{
				//Serving the client
				res.json(result);
			},function(err)
			{
				//Logging the Error
				console.log(err);
			})

		}
	})
	
});


router.get('/:collection/:name/:parentresource/:parentid/:childresource/:childid',function(req,res)
{
	var collection = req.params.collection;
	var name = req.params.name;
	var parentresource = req.params.parentresource;
	var parentid = req.params.parentid;
	var childresource = req.params.childresource;
	var childid = req.params.childid;
	//using async function to control the flow of the program	
	Datasource.Identify(collection).then(function(Datasource)
	{
		//Checking the Datasource 
		if(Datasource=="MongoDb")
		{
			//Logging The Error 
			console.log(Datasource);
			//Passing the parameters to fetch the result
			childquery.find(collection,name,parentresource,parentid,childresource,childid).then(function(result)
			{
				//Serving the client in JSON format
				res.json(result);
			},function(err)
			{
				//Logging the error
				console.log(err);
			})

		}
	})
	
});
module.exports = router;
