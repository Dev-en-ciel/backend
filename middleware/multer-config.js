//importation de multer
const multer = require('multer');

//Objet de configuration pour multer
const MINE_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpeg',
    'image.png': 'png'
};

// 
const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callbacj(null, 'images')
    },
    filename: (req, file, callback) => {
        const name = file.originalname.split(' ').joint(' ');
        const extention = MINE_TYPES[file.mimetype];
        callback(null, name + Date.now() + '.' + extention);
    }
});


module.exports = multer({storage: storage}).single('image');