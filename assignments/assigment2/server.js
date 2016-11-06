//Import mongoose and Assert
var mongoose = require('mongoose');
var assert = require('assert');

//Import our dishes schema
var dishes = require('./models/dishes');

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
      "name": "Uthapizza",
      "image": "images/uthapizza.png",
      "category": "mains",
      "label": "Hot",
      "price": "4.99",
      "description": "A unique . . .",
      "comments": [
        {
          "rating": 5,
          "comment": "Imagine all the eatables, living in conFusion!",
          "author": "John Lemon"
        },
        {
          "rating": 4,
          "comment": "Sends anyone to heaven, I wish I could get my mother-in-law to eat it!",
          "author": "Paul McVites"
        }
      ]
	}, function (err,dish){
		if(err){
			throw err;
		}else{
			console.log('Dish created');
			console.log(dish);
			var id = dish.id;

			//set a bit delay (3 seconds)
			setTimeout(function (){
				dishes.findByIdAndUpdate(id, {
					$set: {
						description: 'Updated Test'
					}
				},{
					new: true
				}).exec(function (err, dish){
					if(err){
						throw err;
					}else{
						console.log('Updated Dish');
						console.log(dish);

						//Update the 'Comment' sub-document
						dish.comments.push({
							rating: 5,
							comment: 'Ready to put into microwaves',
							author: 'Luigi mangia una pizza'
						});
						//save the update
						dish.save(function (err, dish){
							console.log('Updated comments!');
							console.log(dish);
							//Remove everithing and close connection
							db.collection('dishes').drop(function(){
							db.close();
							});
						});	
					}
				});
			}, 3000);
		}
	});
});