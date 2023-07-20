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
//  On retrouve les détails des contrôleurs dans 'backend/controllers/stuff.js'

// Les routes sont préfixées grâce à la ligne suivante dans le fichier /backend/app.js : "app.use('/api/books', bookRoutes)";

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





//               --------- PUT ---------

//  --------- Mise à jour d'un livre ---------
router.put('/:id', auth, multer.upload.single('image'), multer.resizeAndSaveImage, bookCtrl.updateTargetBook);

//      Correction : Ajout des middlewares multer pour stockage et traitement de la nouvelle image



//               --------- DELETE ---------

//  --------- Suppression d'un livre ---------
router.delete('/:id', auth, bookCtrl.deleteTargetBook);



module.exports = router;
// Export de l'application pour utilisation sur d'autres fichiers
// Notre fichier 'server.js' contient 'const app = require('./app');'. Donc sans export, server.js ne fonctionne pas correctement

// AUTHENTIFICATION :   avec le middleware auth au début de chaque route, on s'assure que l'utilisateur est autorisé à accéder aux API.
