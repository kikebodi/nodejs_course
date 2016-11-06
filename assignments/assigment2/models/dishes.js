/*
**	Add the new fields (image,category and price)
*/

//Import mongoose and it's features
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
// Will add the Currency type to the Mongoose Schema types
require('mongoose-currency').loadType(mongoose);
var Currency = mongoose.Types.Currency;

//Create the comment Schema (sub-document)
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

//Create the Schema (document)
var dishSchema = new Schema({
	name: {
		type: String,
		required: true,
		unique: true
	},
	image: {
		type: String,
		required: true,
		unique: true
	},
	category: {
		type: String,
		required: true,
		unique: false
	},
	label: {
		type: String,
		default: ''
	},
	price: {
		type: Currency,
		required: true,
		unique: false
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