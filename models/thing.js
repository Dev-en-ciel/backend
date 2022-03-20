//importation de mongoose
const mongoose = require('mongoose');

//schema de données 
const thingSchema = mongoose.Schema({
    title: { type: String, required: true}, //les champs avec required sont obligatoire
    description: {type: String, required : true},
    imageUrl: {type: String, required : true},
    userId: {type: String, required : true},
    price: {type: Number, required : true},
});

//exportation du schema
//la methode model transforme le model en un modele utilisable 
module.exports = mongoose.model('thing', thingSchema);

