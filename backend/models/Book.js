//Thing est là pour gérer les schémas de données, soit les formats attendus pour chaque type de données

const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    userId: {type:String, required: true}, // identifiant MongoDB unique de l'utilisateur qui a créé le livre
    title: {type:String, required: true}, // titre du livre
    author: {type:String, required: true}, // auteur du livre
    imageUrl: {type:String, required: true}, // illustration/couverture du livre
    year: {type:Number, required: true}, // année de publication du livre
    genre: {type:String, required: true}, // genre du livre
    ratings: [{
        userId: {type:String, required: true}, // identifiant MongoDB unique de l'utilisateur qui a noté le livre
        grade: {type:Number, required: true} // note donnée à un livre
    }], // notes données à un livre 
    averageRating: {type:Number }}, // note moyenne du livre,
    { collection: 'books' });

//Ci-dessus, un exemple de schéma de données objets (c'est à dire les données qu'on attend dans un élément)
// Type : String indique le format attendu
// Required: true signifie qu'on attend obligatoirement cette donnée


module.exports = mongoose.model('Book', bookSchema);
// On exporte ensuite le modèle souhaité. Le premier argument est le nom du modèle et le deuxième argument est le schéma