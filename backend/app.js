//Import des dépendances et plugins
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');

// Import des routes relatives à user et book
const authRoutes = require('./routes/user')
const bookRoutes = require('./routes/book')


mongoose.connect('mongodb+srv://geoffreyvalade92:gA7t76toWPVEsFk4@cluster0.dzwjg1n.mongodb.net/projet_7?retryWrites=true&w=majority',
{ useNewUrlParser: true, useUnifiedTopology: true })
.then(() => console.log('Connexion à MongoDB réussie !'))
.catch(() => console.log('Connexion à MongoDB échouée !'));
// Les lignes au dessus nous permettent de nous connecter à MongoDB grâce à la combinaison username:mdp dans l'url (geoffreyvalade92:gA7t76toWPVEsFk4)
// l'URL mongodb contient le nom de notre répertoire dans la BDD (mongodb.net/projet-7)

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});
// Le middleware ci-dessus nous permet de gérer les autorisations CORS

app.use(express.urlencoded({extended:true}));
app.use(express.json());
// Nous permet de receptionner les corps des requêtes
// Equivalent de bodyparser

app.use('/api/auth', authRoutes);
app.use('/api/books', bookRoutes);
app.use('/images', express.static(path.join(__dirname, 'images')));
// Ces lignes nous permettent de préfixer les routes de toutes les requêtes authRoutes et bookRoutes

module.exports = app;
// Export de l'application pour utilisation sur d'autres fichiers
// Notre fichier 'server.js' contient 'const app = require('./app');'. Donc sans export, server.js ne fonctionne pas correctement