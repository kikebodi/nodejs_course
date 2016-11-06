/*
**	Create a new Schema for leadership
*/

//Import mongoose and it's features
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//Create the Schema (document)
var leaderSchema = new Schema({
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
	designation: {
		type: String,
		required: true,
		unique: false
	},
	abbr: {
		type: String,
		required: true,
		unique: false
	},
	description: {
		type: String,
		required: true
	}
	//This will add two more fields to the document (created and modified timestamp)
	},{
	timestamps: true
});

//Here we create the model for the Schema
var leaders = mongoose.model('Leader', leaderSchema);
//and make it available to out Node application
module.exports = leaders;