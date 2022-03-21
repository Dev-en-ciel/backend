//  importation de bcrypt
const bcrypt = require('bcrypt');

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
                .then(() => res.statud(201).json({ message: 'Utilisateur créé !' }))
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
                return res.status(401).json({ error: 'mot de passe incorrect !' });
            }
            res.status(200).json({
                userId: user._id,
                token: 'TOKEN'
            });
        })
        .catch(error => res.status(500).json({ error }));
};