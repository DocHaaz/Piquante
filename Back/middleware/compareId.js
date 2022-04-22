// Variables d'environnement
require('dotenv').config();

// Importation des modules
const jsonWebToken = require('jsonwebtoken')
const Sauce = require('../models/sauces')

// Vérification de l'identité de l'initiateur de la requête
module.exports = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
        .then(sauce => {
            const token = req.headers.authorization.split(' ')[1];
            const decodedToken = jsonWebToken.verify(token, process.env.TokenSecret);
            const userId = decodedToken.userId;
            if(sauce.userId !== userId) {
                res.status(403).json({ message: 'Requête non authorisée'})
            } else {
                next();
            }
        })
        .catch(error => res.status(400).json({ error }))
}