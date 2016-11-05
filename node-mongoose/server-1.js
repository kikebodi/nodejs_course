//Import mongoose and Assert
var mongoose = require('mongoose');
var assert = require('assert');

//Import our dishes schema
var dishes = require('./models/dishes-1');

//connect to the URL
var URL = 'mongodb://localhost:27017/conFusion';
mongoose.connect(URL);
var db = mongoose.connection;
//Catch the error
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
//In case everything is correct
db.once('open', function(){
	//We are connected
	console.log('Connection to MongoDB: OK');

	//Create new dish...
	var newDish = dishes({
		name: 'Coolpizza',
		description: 'Test'
	});
	//... and save the dish
	newDish.save(function(err){
		if(err){
			throw err;
		}else{
			console.log('Dish created');
		}

		//Get all the dishes 
		dishes.find({}, function(err,listDishes){
			if(err){
				throw err;
			}else{
				//Print the object of all the users
				console.log(listDishes);
			}

			//Close connections
			db.collection('dishes').drop(function(){
				db.close();
			});
		});
	});

});

