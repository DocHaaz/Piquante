// Importation des module / package
const Sauce = require('../models/sauces');
const fs = require('fs');

// Création d'une nouvelle sauce
exports.createSauce = (req, res) => {
  const sauceObject = JSON.parse(req.body.sauce);
  const sauce = new Sauce({
    ...sauceObject,
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  });
  sauce.save()
    .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
    .catch(error => res.status(400).json({ error }));
};

// Lecture de l'ensemble des sauces
exports.getAllSauce = (req, res) => {
  Sauce.find()
  .then((sauces) => { res.status(200).json(sauces) })
  .catch(
    (error) => { res.status(400).json({ error: error }); }
    );
  };
  
// Lecture d'une sauce (en fonction de son id)
exports.getOneSauce = (req, res) => {
  Sauce.findOne({ _id: req.params.id })
    .then((sauce) => { res.status(200).json(sauce) })
    .catch((error) => { res.status(404).json({ error: error })});
};

// Modification d'une sauce
exports.modifySauce = (req, res) => {
  if(req.file) {
    Sauce.findOne({ _id: req.params.id })
    .then((sauce) => {
      const filename = sauce.imageUrl.split('/images/')[1];
      fs.unlink(`images/${filename}`,  (error) => {
        if(error) {
          throw error;
        }
      });
    })
    .catch(error => res.status(500).json({ error }));
  } 
  const sauceObject = req.file ?
    {
      ...JSON.parse(req.body.sauce),
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : {
      ...req.body
    };
  Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })
    .then((sauce) => res.status(200).json({ message: 'Sauce modifiée', data: sauce }))
    .catch(error => res.status(400).json({ error }))
}

// Suppression d'une sauce
exports.deleteSauce = (req, res) => {
  Sauce.findOne({ _id: req.params.id })
    .then((sauce) => {
      const filename = sauce.imageUrl.split('/images/')[1];
      fs.unlink(`images/${filename}`, () => {
        Sauce.deleteOne({ _id: req.params.id })
          .then(() => res.status(200).json({ message: 'Sauce supprimé'}))
          .catch(error => res.status(400).json({ error }));
      });
    })
    .catch(error => res.status(500).json({ error }));
};

// Gestion de la fonctionnalité Likes/Dislikes
exports.likeSauce = (req, res) => {
  Sauce.findOne({ _id: req.params.id })
  .then((sauce) => {
    if(!sauce.usersLiked.includes(req.body.userId) && !sauce.usersDisliked.includes(req.body.userId)) {
      if( req.body.like == 1){
        sauce.likes += 1
        sauce.usersLiked.push(req.body.userId)
      } 
      if( req.body.like == -1){
        sauce.dislikes += 1
        sauce.usersDisliked.push(req.body.userId)
      }
    }
    if(sauce.usersLiked.includes(req.body.userId) && req.body.like == 0) {
      const userIndex = sauce.usersLiked.indexOf(req.body.userId)
      sauce.likes -= 1
      sauce.usersLiked.splice(userIndex, 1)
    }
    if(sauce.usersDisliked.includes(req.body.userId) && req.body.like == 0) {
      const userIndex = sauce.usersDisliked.indexOf(req.body.userId)
      sauce.dislikes -= 1
      sauce.usersDisliked.splice(userIndex, 1)
    }
      sauce.save();
      res.status(200).json({ sauce })
    })
    .catch((error) => res.status(404).json({ error }))
}