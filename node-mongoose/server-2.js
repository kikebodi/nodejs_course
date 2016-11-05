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

	//Here we create a new dish
	dishes.create({
		name: 'Coolpizza',
		description: 'Test'
	}, function(err,dish){
		if(err){
			throw err;
		}else{
			console.log('Dish created');
			console.log(dish);
			var id = dish.id;

			//set a bit delay (3 seconds)
			setTimeout(function(){
				dishes.findByIdAndUpdate(id, {
					$set: {
						description: 'Updated Test'
					}
				},{
					new:true
				}).exec(function(err, dish){
					if(err){
						throw err;
					}else{
						console.log('Updated Dish');
						console.log(dish);

						db.collection('dishes').drop(function(){
							db.close();
						});
					}
				});
			}, 3000);
		}
	});

});