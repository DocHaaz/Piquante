// Variables d'environnement
require('dotenv').config();

// Importation des modules / package
const bCrypt = require('bcrypt')
const users = require('../models/users')
const jsonWebToken = require('jsonwebtoken')

// Inscription d'un nouvel utilisateur
exports.signup = (req, res) => {
    bCrypt.hash(req.body.password, 10)
        .then(hash => {
            const user = new users({
                email: req.body.email,
                password: hash
            })
            user.save()
                .then(() => res.status(201).json({ message: 'Utilisateur créée'}))
                .catch(error => res.status(400).json({ error }))
        })
        .catch(error => res.status(500).json({ error }))
}

// Connexion d'un utilisateur (existant)
exports.login = (req, res) => {
    users.findOne({ email: req.body.email })
        .then(user => {
            if(!user) {
                return res.status(401).json({ error: 'Utilisateur non trouvé'})
            }
            bCrypt.compare(req.body.password, user.password)
                .then(valid => {
                    if (!valid) {
                        return res.status(401).json({ error: 'Password incorrect'})
                    }
                    res.status(200).json({
                        userId: user._id,
                        token: jsonWebToken.sign({ userId: user._id}, process.env.TokenSecret, { expiresIn: '24h'})
                    })
                })
                .catch(error => res.status(500).json({ error }))
        })
        .catch(error => res.status(500).json({ error }))
}