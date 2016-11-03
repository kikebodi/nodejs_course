//Import MongoDB modules
var mongoClient = require('mongodb').MongoClient;
var assert = require('assert');

//Connection URL
var URL = 'mongodb://localhost:27017/conFusion';

//Using 'connect' method to connect to the database
mongoClient.connect(URL, function(err,db){
	assert.equal(err,null);
	console.log('Connected correctly to the server');

	var collection = db.collection("dishes");
	collection.insertOne(
		{name: "Cool pizza", description: "Cold pizza for homeless people"}, function(err,result){
			assert.equal(err,null);
			// '.ops' array of al the documments inserted
			console.log('After Insert:');
        	console.log(result.ops);

			//Code for query
			collection.find({}).toArray(function(err, docs){
				assert.equal(err,null);
				console.log('Found:');
				console.log(docs);

				//Remove the collection to maintain the DB clear.
				db.dropCollection("dishes", function(err, result){
					assert.equal(err,null);
					console.log('Deleted:');
					console.log(result);
					db.close();

				});
			})
		});

});



