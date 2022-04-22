// Importation des modules
const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validation')

// Création du schema mongoose pour les Users
const userSchema = mongoose.Schema({
    email: { type: String, required: true, unique: true},
    password: { type: String, required: true}
})

// Ajout du module unique validator au schema
userSchema.plugin(uniqueValidator);

// Exportation du schema
module.exports = mongoose.model('user', userSchema)