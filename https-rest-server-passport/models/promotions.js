/*
**	Create a new Schema for promotions
*/

//Import mongoose and it's features
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
// Will add the Currency type to the Mongoose Schema types
require('mongoose-currency').loadType(mongoose);
var Currency = mongoose.Types.Currency;

//Create the Schema (document)
var promoSchema = new Schema({
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
	//This will add two more fields to the document (created and modified timestamp)
	},{
	timestamps: true
});

//Here we create the model for the Schema
var promos = mongoose.model('Promotion', promoSchema);
//and make it available to out Node application
module.exports = promos;