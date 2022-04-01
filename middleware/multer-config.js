// //importation de multer
const multer = require('multer');

//Objet de configuration pour multer
const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png'
};

// middleware 
//Creation de la constante storage à passer a multer comme congiguration
// contient la logique nécessaire pour indiquer a multer ou enregistrer les fichiers entrants
const storage = multer.diskStorage({
    //indique qu'il faut enregistrer les fichiers dans le dossier image
  destination: (req, file, callback) => {
    callback(null, 'images');
  },
//fonction qui indique a multer d'utiliser le nom d'origine et de remplaceer les espaces par des underscorer _ et de lui ajouter un timestamp (date)
  filename: (req, file, callback) => {
    const name = file.originalname.split(' ').join('_');
        // utilisation du dictionnaire de type mime pour résoudre l'extension de fichier approprié(jpg, jpeg, etc)
    const extension = MIME_TYPES[file.mimetype];
    callback(null, name + Date.now() + '.' + extension);
  }
});

//exportation de multer en lui indiquant que nous geront que les telechargements
module.exports = multer({storage: storage}).single('image');
// la methide single créer un middleware qui capture les fichier d'un certain type que l'on as passé en argument 
// et les enregistre au systeme de fichiers du server a l'aide du storage configuré
