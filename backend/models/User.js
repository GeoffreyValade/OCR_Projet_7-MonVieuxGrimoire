const mongoose = require('mongoose');

const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
    email: {type:String, required: true, unique: true},
    password: {type:String, required: true}},
    { collection: 'users' });

userSchema.plugin(uniqueValidator);
// L'utilisation du plugin nous permet de nous assurer que l'email rentré par un user sera unique
// Nous avons installé le plugin 'mongoose-unique-validator'

module.exports = mongoose.model('User', userSchema);