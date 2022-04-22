// Importation des modules / package
const express = require('express')
const auth = require('../middleware/auth')
const multer = require('../middleware/multer')
const compareId = require('../middleware/compareId')
const sauceController = require('../controllers/sauce')

// Création du router
const router = express.Router()

// Création des routes Sauces
router.get('/', auth, sauceController.getAllSauce);
router.get('/:id', auth,  sauceController.getOneSauce);
router.post('/', auth, multer, sauceController.createSauce);
router.put('/:id', auth, compareId, multer, sauceController.modifySauce);
router.delete('/:id', auth, compareId, sauceController.deleteSauce);
router.post('/:id/like', auth, sauceController.likeSauce)

// Exportation du router
module.exports = router;