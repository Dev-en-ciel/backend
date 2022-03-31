//  importation de bcrypt
const bcrypt = require('bcrypt');
//importation de jsonwebtoken
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// fonction(middleware) signup pour l'enregistrement des utilisateurs
exports.signup = (req, res, next) => {
    // hasher le mot de pass avec une fonction qui est asyncrhone
    bcrypt.hash(req.body.password, 10) //on lui passe le mot de pass du corp de requete passer en frontend, le salt (combien de fois on execute le hashage )
        .then(hash => {
            const user = new User({
                email: req.body.email, // permet de voir si les emails correspondent
                password: hash
            });
            //  enregistrement de l'utilisateur dans la base de données
            user.save()
                .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
                .catch(error => res.status(400).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};

// fonction login pour la connection des utilisateurs existants
exports.login = (req, res, next) => {
    // trouver le user dans la base de donnée qui correspond à l'adresse email qui est rentrée par l'utilisateur
    User.findOne({ email: req.body.email })
        .then(user => {
            if (!user) {
                return res.status(401).json({ error: 'Utilisateur non trouvé !' });
            }
            //comparaison du mot de passe entré par l'utilisatuer avec celui enregistré dans la base de données
            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    //si different retourne une erreur 401 et message d'erreur
                    if (!valid) {
                        return res.status(401).json({ error: 'Mot de passe incorrect !' });
                    }
                    res.status(200).json({
                        userId: user._id,
                        //utilisaion de la fonction sign de jsonwebtoken pour encoder un nouveau token
                        token: jwt.sign(
                            //token qui contient l'id de l'utilisateur 
                            { userId: user._id },
                            //utilisation d'une chaine secrete de développement temporaire pour une durée de 24h
                            'RANDOM_TOKEN_SECRET',
                            { expiresIn: '24h' }
                        )
                    });
                })
                .catch(error => res.status(500).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};