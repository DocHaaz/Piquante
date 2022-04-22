// Importation des modules / package
const express = require('express')
const userController = require('../controllers/user')

// Création du router
const router = express.Router()

// Création des routes Users
router.post('/signup', userController.signup);
router.post('/login', userController.login);

// Exportation du router
module.exports = router;