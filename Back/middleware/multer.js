// Importation du module multer
const multer = require('multer');

// Création d'un dictionnaire de type de fichiers
const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png'
};

// Configuration de multer
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'images');
  },
  filename: (req, file, callback) => {
    const sauce = JSON.parse(req.body.sauce)
    const name = sauce.name.split(' ').join('_');
    const extension = MIME_TYPES[file.mimetype];
    callback(null, name + "_" + Date.now() + '.' + extension);
  }
});

// Exportation de multer
module.exports = multer({storage}).single('image');