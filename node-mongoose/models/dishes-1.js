//Import mongoose and it's features
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//Create the Schema
var dishSchema = new Schema({
	name: {
		type: String,
		required: true,
		unique: true
	},
	description: {
		type: String,
		required: true
	}
	},
	//This will add two more fields to the document (created and modified timestamp)
	{
	timestamps: true
});

//Here we create the model for the Schema
var dishes = mongoose.model('Dish', dishSchema);
//and make it available to out Node application
module.exports = dishes;