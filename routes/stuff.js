// /fichier qui contient uniquement la logique de routine
const express = require('express');

const router = express.Router();
//importation du middleware d'authorisation
const auth = require('../middleware/auth');

// impotation du controlleur stuff
const stuffCtrl = require('../controllers/stuff');

// Chemin de la route pour la creation de l'objet
router.post('/', auth,  stuffCtrl.createThing);

//Chemin de la route pour la modification de l'objet
router.put('/:id', auth, stuffCtrl.modifyThing);

//Chemin de la route pour la suppression de l'objet
router.delete('/:id', auth, stuffCtrl.deleteThing);

//Chemin de la route pour la récuperation de l'objet
router.get('/:id', auth,  stuffCtrl.getOneThing);

//Chemin de la route pour la récuperation de tout les objets
router.get('/', auth, stuffCtrl.getAllStuff);

module.exports = router;