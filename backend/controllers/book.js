const Book = require('../models/Book');
//Ne pas oublier d'importer les schémas concernés par nos fonctions contrôleurs

//               --------- GET ---------

//  --------- Récupération de tous les livres ---------
exports.getAllBooks = (req, res, next) => {
  Book.find()
    .then((books) => {
      res.status(200).json(books); // Renvoie les livres au client
    })
    .catch((error) => {
      res.status(400).json({
        error: error.message
      });
    });
};


//  --------- Récupération de livre ciblé ---------
exports.getTargetBook = (req, res, next) => {
  Book.findOne({ _id: req.params.id })
    .then(book => res.status(200).json(book))
    .catch(error => res.status(404).json({ error }));
};


//  --------- Récupération des livres les mieux notés ---------
exports.getBestRatedBooks = (req, res, next) => {
  Book.find()
    .sort({ averageRating: -1 }) // Trier par ordre décroissant de la note
    .limit(3) // Limiter le nombre de livres renvoyés à 3
    .then((books) => { res.json(books) })
    .catch(error => res.status(400).json({ error }));
};





//               --------- POST ---------

//  --------- Ajout de livre ---------
exports.postNewBook = (req, res, next) => {
  const bookObject = JSON.parse(req.body.book);
  delete bookObject._id;
  delete bookObject._userId;
  console.log('file', req.file);
  const timestamp = Date.now();
  const book = new Book({
    ...bookObject,
    userId: req.auth.userId,
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  });
  book.save()
    .then(() => { res.status(201).json({ message: 'Succès !' }) })
    .catch(error => { res.status(400).json({ error }) })
};


//  --------- Donner une note à un livre ---------
exports.postTargetBookRate = (req, res, next) => {
  const bookId = req.params.id;
  const { rating, userId } = req.body;

  Book.findOneAndUpdate(
    { _id: bookId },
    { $push: { ratings: { userId, grade: rating } } },
    { new: true }
  )
    .then((updatedBook) => {
      if (!updatedBook) {
        return res.status(404).json({ message: "Livre non trouvé." });
      }

      // Calcul de la nouvelle note moyenne en récupérant l'objet updatedBook (donc qui contient les notes originelles ainsi que la nouvelle)
      const ratings = updatedBook.ratings.map((r) => r.grade);
      // (r) = 1 objet de notre tableau
      // "r.grade" = la valeur "grade" de l'élément "r"

      const newAverageRating = ratings.reduce((sum, grade) => sum + grade, 0) / ratings.length;

      // On déclare que averageRating de l'objet updatedBook = newAverageRating
      updatedBook.averageRating = newAverageRating;

      // Sauvegarde finale
      updatedBook
        .save()
        .then((savedBook) => {
          res.status(200).json(savedBook);
        })
        .catch((error) => {
          res.status(500).json({ error });
        });
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};





//               --------- PUT ---------

//  --------- Mise à jour d'un livre ---------
exports.updateTargetBook = (req, res, next) => {
  Book.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Objet modifié !' }))
    .catch(error => res.status(400).json({ error }));
};


//  --------- Mise à jour d'un livre ---------






//               --------- DELETE ---------

//  --------- Suppression d'un livre ---------
exports.deleteTargetBook = (req, res, next) => {
  Book.deleteOne({ _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Objet supprimé !' }))
    .catch(error => res.status(400).json({ error }));
};
