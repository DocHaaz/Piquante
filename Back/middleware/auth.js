// Variables d'environnement
require('dotenv').config();

// Importation des modules
const jsonWebToken = require('jsonwebtoken');

// Gestion de l'authentification
module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jsonWebToken.verify(token, process.env.TokenSecret);
        const userId = decodedToken.userId;
        req.auth = { userId: userId };
        if(req.body.userId && req.body.userId !== userId) {
            throw 'User ID non valide';
        } else {
            next();
        }
    } catch (error) {
        res.status(401).json({ error: error | 'Requête non authentifiée'})
    }
};