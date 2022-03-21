// importation d'express
const express = require('express');

// importation du routeur
const router = express.Router()

// importation du controleur pour associer les differentes routes
const userCtrl = require('../controllers/user');

// creation de deux route de type post
router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);

// exportation du router 
module.exports = router;