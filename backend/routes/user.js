const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user');


//  --------- Route pour la l'inscription ---------
router.post('/signup', userCtrl.signup);

//  --------- Route pour la connexion ---------
router.post('/login', userCtrl.login);

module.exports = router;
// Export de l'application pour utilisation sur d'autres fichiers
// Notre fichier 'server.js' contient 'const app = require('./app');'. Donc sans export, server.js ne fonctionne pas correctement

// AUTHENTIFICATION :   il n'est pas bon d'inclure le middleware auth dans ces routes,
//                      puisque l'utilisateur n'a pas encore de token avant d'être connecté.
