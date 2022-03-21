// importation de mongoose
const mongoose = require('mongoose');

// ajout du plug-in au schema  
const uniqueValidator = require('mongoose-unique-validator');

// creation du schema 
const userSchema = mongoose.Schema({
    // imformation stocker dans le schema
    email: { type: String, required: true, unique: true },//unique true = pour que l'adresse mail soit utilisé une seul fois
    password: { type: String, requiered: true }
});

// application du validator en ajoutant uniqueValidator en argumant
userSchema.plugin(uniqueValidator);

// exportation du schema sous forme model
module.exports = mongoose.moderl('User', userSchema);