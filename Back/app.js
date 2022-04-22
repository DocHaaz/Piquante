// Variables d'environnement
require('dotenv').config();

// Importation des modules / packages
const express = require('express');
const mongoose = require('mongoose');
const path = require('path')
const usersRoutes = require ('./routes/user')
const saucesRoutes = require('./routes/sauce')

// Connexion a la base de donnée MongoDB
mongoose.connect(`mongodb+srv://${process.env.MongoDBUser}:${process.env.MongoDBPassword}@${process.env.MongoDBCluster}.mongodb.net/${process.env.MongoDBDataBase}?retryWrites=true&w=majority`,
{ useNewUrlParser: true,
  useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));
  

// Création de l'application express
const app = express();

// Gestion du CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

//  Gestion des requêtes POST
app.use(express.json())

// Création d'un middleware pour la gestion des images
app.use('/images', express.static(path.join(__dirname, 'images')))

// Enregistrement du router 
app.use('/api/auth', usersRoutes)
app.use('/api/sauces', saucesRoutes)

// Exportation de l'application express
module.exports = app;