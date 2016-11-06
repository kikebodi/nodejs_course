//Import mongoose and Assert
var mongoose = require('mongoose');
var assert = require('assert');

//Import our dishes schema
var dishes = require('./models/dishes');
//Import our promotions schema
var promotions = require('./models/promotions');
//Import our leadership schema
var leaders = require('./models/leadership');


//connect to the URL
var URL = 'mongodb://localhost:27017/conFusion';
mongoose.connect(URL);
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', function(){
	//We are connected
	console.log('Connection to MongoDB: OK');

	console.log('=================DISHES===============================================');

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
			console.log('error 1. dishes');
		}else{
			console.log('Dish created');
			console.log(dish);
			//Drop dishes
			db.collection('dishes').drop(function(){});
			var id = dish.id;

			/*/set a bit delay (3 seconds)
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
						console.log('error 2. dishes');
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
			}, 1000);*/
		}
	});

	console.log('===========PROMOTIONS=====================================================');
	//Here we create a new promotion
	promotions.create( {
      "name": "Wekeend Grand Buffet",
      "image": "images/buffet.png",
      "label": "New",
      "price": "19.99",
      "description": "Featuring . . ."
	}, function (err,promotion){
		if(err){
			console.log("Error 1. promotions");
			throw err;
		}else{
			console.log('promotion created');
			console.log(promotion);
			//Drop promotions
			db.collection('promotions').drop(function(){});
		}
	});

	console.log('===========LEADERS=====================================================');
	//Here we create a new leader
	leaders.create( {
      "name": "Peter Pan",
      "image": "images/alberto.png",
      "designation": "Chief Epicurious Officer",
      "abbr": "CEO",
      "description": "Our CEO, Peter, . . ."
	}, function (err,leader){
		if(err){
			console.log("Error 1. leaders");
			throw err;
		}else{
			console.log('leader created');
			console.log(leader);	
			}
		});

	
	//Remove everithing and close connection
	db.collection('leaders').drop(function(){
	db.close();
	});
});