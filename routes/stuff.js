// /fichier qui contient uniquement la logique de routine
const express = require('express');

const router = express.Router();

// impotation du controlleur stuff
const stuffCtrl = require('../controllers/stuff');

// Chemin de la route pour la creation de l'objet
router.post('/', stuffCtrl.createThing);

//Chemin de la route pour la modification de l'objet
router.put('/:id', stuffCtrl.modifyThing);

//Chemin de la route pour la suppression de l'objet
router.delete('/:id', stuffCtrl.deleteThing);

//Chemin de la route pour la récuperation de l'objet
router.get('/:id', stuffCtrl.getOneThing);

//Chemin de la route pour la récuperation de tout les objets
router.get('/', stuffCtrl.getAllStuff);

module.exports = router;