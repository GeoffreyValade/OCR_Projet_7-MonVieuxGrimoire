const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/User');
//Ne pas oublier d'importer les schémas concernés par nos fonctions contrôleurs

//  --------- Logique d'inscription ---------
exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            const user = new User({
                email: req.body.email,
                password: hash
            });
            user
            .save()
            .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
            .catch(error => {
              console.error(error); 
              res.status(400).json({ error: 'Une erreur est survenue lors de la création de l\'utilisateur.' });
            });
        })
        .catch(error => res.status(500).json({ error }));
};
// Le hashage est une fonction asynchrone (ça met du temps)
// Au moment d'envoyer la requête, on transforme le mot de passe en le hashant ('bcrypt.hash')
// Ensuite, on récupère le hash de mdp
// On le récupère pour créer un nouvel utilisateur, avec comme données :
//      email = email de la requête
//      mdp = le hash récupéré
// Puis on save
// On note qu'au moment de déclarer new User, on utilise le schéma déclaré plus tôt (dans 'backend/models/User.js')
//  Donc un schéma qui demande obligatoirement des valeurs devant les clés 'email' et 'password'
// On renvoie ensuite une réponse pour notifier du résultat dans la console



//  --------- Logique de connexion ---------

//  /!\ Doit contenir un token, autrement => Une erreur est survenue. /!\
//  (L'erreur est géré dans le front, fichier : 'front/src/pages/signin')

exports.login = (req, res, next) => {
    User.findOne({ email: req.body.email })
        .then(user => {
            if (!user) {
                return res.status(401).json({ message: 'identifiant ou mot de passe incorrect' });
            }
            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    if (!valid) {
                        return res.status(401).json({ message: 'identifiant ou mot de passe incorrect' });
                    }
                    res.status(200).json({
                        userId: user._id,
                        token: jwt.sign(
                            { userId: user._id },
                            'RANDOM_TOKEN_SECRET',
                            { expiresIn: '24h' }
                        )
                    });
                })
                .catch(error => res.status(500).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};
// On commence par chercher dans la BDD, l'élément qui a un email correspondant à celui qui est rentré par l'utilisateur
// On dit que si user = null, alors l'erreur est géré de suite
// Sinon, on va demander à bcrypt de comparer le mdp rentré et celui qui est associé à l'email du user ciblé
// S'il n'est pas correspondant, on renvoie une erreur
// Si il correspond, on renvoie une id et un token











// ------------ Cours ------------


//  Ci-dessous, un exemple de logique de route simple :
//  Je peux envoyer une requête POST à http://localhost:4000/api/auth/signup
//  Je vais recevoir une réponse "Objet créé !"
//  Plusieurs types de routes possibles :
//      - 'router.post(), (req, res, next) => ...
//      - 'router.get(), ...
//      - 'router.delete(), ...
//      - 'router.use(), ...


/*

exports.login = (req, res, next) => {
    console.log(req.body);
    res.status(201).json({
        message: 'Connexion réussie !'
    });
    next();
};

*/

