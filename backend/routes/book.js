const express = require('express');
const router = express.Router();
const bookModel = require('../models/Book');
const bookCtrl = require('../controllers/book');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config')

//          Travail sur le projet :
//              Les routes :
//  ATTENTION ! Une requête réceptionnée doit toujours avoir une réponse (res.status(201)) !

//  Les routes ci-dessous sont simplifiées => ce qui nous permet de les voir clairement
//  On retrouve les détails dans 'backend/controllers/stuff.js'


//               --------- GET ---------

//  --------- Récupération de tous les livres ---------
router.get('/', bookCtrl.getAllBooks);

//  --------- Récupération des livres les mieux notés ---------
router.get('/bestrating', bookCtrl.getBestRatedBooks);

//  --------- Récupération de livre ciblé ---------
router.get('/:id', bookCtrl.getTargetBook);





//               --------- POST ---------

//  --------- Poster un nouveau livre ---------
router.post('/', auth, multer.upload.single('image'), multer.resizeAndSaveImage, bookCtrl.postNewBook);

//  --------- Donner une note à un livre ---------
router.post('/:id/rating', auth, bookCtrl.postTargetBookRate)


// ( PENSER A GERER L'AUTHENTIFICATION AVEC ('/:id/rating', auth, bookCtrl.postTargetBookRate) )





//               --------- PUT ---------

//  --------- Mise à jour d'un livre ---------
router.put('/:id', auth, bookCtrl.updateTargetBook);





//               --------- DELETE ---------

//  --------- Suppression d'un livre ---------
router.delete('/:id', auth, bookCtrl.deleteTargetBook);



module.exports = router;
// Export de l'application pour utilisation sur d'autres fichiers
// Notre fichier 'server.js' contient 'const app = require('./app');'. Donc sans export, server.js ne fonctionne pas correctement

// AUTHENTIFICATION :   C'est ici que l'on utilise le middleware auth, 
//                      afin de s'assurer que l'utilisateur est autorisé à accéder aux API.








//------------------------------------------------
//COURS CI-DESSOUS
/*router.use((req, res, next) => {
    console.log('Requête reçu !');
    next();
});

router.use((req, res, next) => {
    res.status(201);
    next();
});

router.use((req, res, next) => {
    res.json({ message : 'Votre requête a bien été reçue !'});
    next();
});

router.use((req, res) => {
    console.log('Réponse envoyée avec succès !');
});*/
