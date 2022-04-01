// /fichier qui contient uniquement la logique de routine
const express = require('express');

const router = express.Router();
//importation du middleware d'authorisation
const auth = require('../middleware/auth');

//importation du middleware enregistrement d'image
const multer = require('../middleware/multer-config');

// impotation du controlleur stuff
const stuffCtrl = require('../controllers/stuff');

//Chemin de la route pour la récuperation de tout les objets
router.get('/', auth, stuffCtrl.getAllStuff);

// Chemin de la route pour la creation de l'objet avec l'auth et multer
router.post('/', auth, multer, stuffCtrl.createThing);

//Chemin de la route pour la récuperation de l'objet
router.get('/:id', auth, stuffCtrl.getOneThing);

//Chemin de la route pour la modification de l'objet
router.put('/:id', auth, multer, stuffCtrl.modifyThing);

//Chemin de la route pour la suppression de l'objet
router.delete('/:id', auth, stuffCtrl.deleteThing);

module.exports = router;

// attention l'ordre des middleware et important 
//EX si on place multer avant auth alors tout les utilisateur meme non authentifier pouront
//enregistrer les images sur le serveur