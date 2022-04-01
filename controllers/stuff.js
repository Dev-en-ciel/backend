// le fichier contient toute la logique métier

// importation du thing
const Thing = require('../models/Thing');
// importation de fs
const fs = require('fs');

// exportation de la fonction createThing
exports.createThing = (req, res, next) => {
  const thingObject = JSON.parse(req.body.thing);
  delete thingObject_id; //on retire le champ id du corp de la requete
  const thing = new Thing({
    ...thingObject, //les 3 petits point = spread est utilisé pour faire une copie de tous les element de req
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.fileanme}`
  });
  thing.save() //pour enregistrer un thing
    .then(() => res.status(201).json({ message: 'Objet enregistré !' }))
    .catch(error => res.status(400).json({ error }));
};

// exportation de la fonction modifyThing
exports.modifyThing = (req, res, next) => {
  const thingObject = req.file ?
    {
      ...JSON.parse(req.body.thing),
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body };
  Thing.updateOne({ _id: req.params.id }, { ...thingObject, _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Objet modifié !' }))
    .catch(error => res.status(400).json({ error }));
};

// exportation de la fonction deleteThing
exports.deleteThing = (req, res, next) => {
  Thing.findOne({ _id: req.params.id })
    .then(thing => {
      const filename = thing.imageUrl.split('/images/')[1];
      fs.unlink(`images/${filename}`, () => {
        Thing.deleteOne({ _id: req.params.id })
          .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
          .catch(error => res.status(400).json({ error }));
      });
    })
    .catch(error => res.status(500).json({ error }));
};

// exportation de la fonction de récuperation d'un objet
exports.getOneThing = (req, res, next) => { //requete GET pour ne répondre qu'aux demande get
  Thing.findOne({ _id: req.params.id }) //methode pour trouver le thing unique avec le meme id que le parametre de la requete
    .then(thing => res.status(200).json(thing)) // si on trouve le thing dans la base de donnée => envoue au frontend
    .catch(error => res.status(404).json({ error })); // si on ne trouve pas l'objet => erreur envoyé au frontend
};

// exportation de la fonction pour la récuperation des objets
exports.getAllStuff = (req, res, next) => {
  Thing.find() //pour retourner les things
    .then(things => res.status(200).json(things))
    .catch(error => res.status(400).json({ error }));
};
