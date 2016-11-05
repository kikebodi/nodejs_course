/*
** ADDING SUB-DOCUMENTS TO A DOCUMENT
*/

//Import mongoose and it's features
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var commentSchema = new Schema({
	rating: {
		type: Number,
		min: 1,
		max: 5,
		required: true
	},
	comment: {
		type: String,
		required: true
	},
	author: {
		type: String,
		required: true
	}
	},{ // note that this is the second attribute of new Schema(attr1, attr2)
		timestamps: true
});

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
	},
	comments:[commentSchema]
	},
	//This will add two more fields to the document (created and modified timestamp)
	{
	timestamps: true
});

//Here we create the model for the Schema
var dishes = mongoose.model('Dish', dishSchema);
//and make it available to out Node application
module.exports = dishes;