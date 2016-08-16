/*######################################################################################################################							   				
DESCRIPTION : Routing the requests to subfiles and serving different requests

Created / Last Modified	by	|	Date			|Comments			   				
__________________________________________________________________________________
Dinesh						|	07/29/2016		| Initial Release
							|					|
							|					|

########################################################################################################################*/
//declaring the required modules 
var express = require ('express');
var parameter = require('./parameter.js');
var database = require('./dbconnection.js');
var async = require('async');
var router = express.Router();

//handling the incoming routes which specifies only collection name
router.get('/:collection',function(req,res){
	var collection = req.params.collection;
	console.log(collection);
//using async function to control the flow of the program	
	async.waterfall([
		function(callback){
//validating the requested collection
			var present = parameter.check(collection);
			callback(null,present);
},
		function(present,callback){
			if (present==1){
				var db = require ('./dbconnection.js');
		var collections = db.collection(collection);
//querying the database
		collections.find({},function(err,docs){
			console.log('we are in find part');
//sending the response to the client
		res.json(docs);
		})
										
;}
			else{
				res.send('collection not found');
	}
		callback(null,'1');
}],
		function(err,result){
			if (err){
				console.log(err);
			}
			console.log(result);
})

});

//handling the incoming routes which specifies collection name along with parent resource
router.get('/:collection/:parentresource',function(req,res){
	var collection = req.params.collection;
	var parentresource = req.params.parentresource;
	console.log(collection);
	//using async function to control the flow of the program	
	async.waterfall([
		function(callback){
			//validating the requested collection
			var present = parameter.check(collection);
			callback(null,present);
},
		function(present,callback){
			if (present==1){
var db = require ('./dbconnection.js');
		var collections = db.collection(collection);
		//querying the database
		collections.find({"name":parentresource},function(err,docs){
			//sending the response to the client
		res.json(docs);
		})
										
;}
			else{
				res.send('collection not found');
	}
		callback(null,'1');
}],
		function(err,res){
			console.log('query is completed');
})

});





//handling the incoming route which specifies parent and child resources
router.get('/:collection/:parentresource/:childresource',function(req,res){
	var collection = req.params.collection;
	var parentresource = req.params.parentresource;
	var childresource = req.params.childresource;
	console.log(childresource);
	var parentid = {};
	//using async function to control the flow of the program	
	async.waterfall([
		function(callback){
			//validating the requested collection
			var present = parameter.check(collection);
			callback(null,present);
},
		function(present,callback){
			if (present==1){

		var db = require ('./dbconnection.js');
		var collections = db.collection(collection);
		parentid["name"]=parentresource;
		//querying the database
		collections.find({$and:[{"relationships":{$exists:true}},parentid]},'relationships',function(err,docs){
			//sending the response to the client
			if(err){
				res.end('could not find ' + childresource);
				console.log(err);
			}
			console.log(docs);
		res.json(docs);
		});
										
;}
			else{
				res.send('collection not found');
	}
		callback(null,'1');
}],
		function(err,res){
			console.log('query is completed');
})

});






//handling incoming routes retrieving using childid
router.get('/:collection/:parentresource/:childresource/:childid',function(req,res){
	
	var collection = req.params.collection;
	var parentresource = req.params.parentresource;
	var childresource = req.params.childresource;
	var childid = req.params.childid;
	var parentid = {};
	//using async function to control the flow of the program	
	async.waterfall([
		function(callback){
			//validating the requested collection
			var present = parameter.check(collection);
			callback(null,present);
},
		function(present,callback){
			if (present==1){
var db = require ('./dbconnection.js');
		var collections = db.collection(collection);
		//querying the database
		parentid["name"] = parentresource;
		var object = {};
		var key = childresource + "." +"title"  ;
		console.log(key);
		object[key]=childid;
		console.log(object);
		//var positionalObject = "'"+'relationships.$:'+ i + "'" ;
		//console.log(positionalObject);
		collections.find({$and:[object,parentid]},'relationships.$:1',function(err,docs){
		//sending the response to the client
		if(err){
			console.log(err);
		}
		res.json(docs);
		
		})
	
										
}
			else{
				res.send('collection not found');
	}
		callback(null,'final');
}],
		function(err,results){
			//var finalresult = JSON.stringify(clientresponse);
				//res.json(finalresult);
			console.log('query is completed');
})

});

//handling incoming routes using for grandchild resource
router.get('/:collection/:parentresource/:childresource/:grandchildresource/:grandchildid',function(req,res){
	var collection = req.params.collection;
	var parentresource = req.params.parentresource;
	var childresource = req.params.childresource;
	var grandchildresource = req.params.grandchildresource;
	var grandchildid = req.params.id;
	console.log(grandchildresource);
	var parentid = {};
//using async function to control the flow of the program	
	async.waterfall([
		function(callback){
//validating the requested collection
			var present = parameter.check(collection);
			callback(null,present);
},
		function(present,callback){
			if (present==1){
		var db = require ('./dbconnection.js');
		var collections = db.collection(collection);
		//querying the database
		for(i=0;i<8;i++){

		var childquery = {};
		var key = childresource + "." + i + "." + "person" + "." + grandchildresource  ;
		childquery[key]=grandchildid;
		parentid["name"] = parentresource;

		collections.find({$and:[childquery,parentid]},function(err,docs){
		//sending the response to the client
		if(err){
			console.log(err);
		}
		if(docs.length==0){
			null;
		}
		else{
		console.log('Serving the client request')
		res.json(docs);
	}
		})
	}
										
;}
			else{
				res.send('collection not found');
	}
		callback(null,'final callback');
}],
		function(err,results){
			if(err){
				console.log(err)
			}
			console.log('query is completed');
})

});


module.exports = router;
