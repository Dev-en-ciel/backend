// le fichier contient toute la logique métier

// importation du thing
const Thing = require('../models/Thing');

// exportation de la fonction createThing
exports.createThing = (req, res, next) => {
    delete req.body._id; //on retire le champ id du corp de la requete
    const thing = new Thing({
        ...req.body //les 3 petits point = spread est utilisé pour faire une copie de tous les element de req
    });
    thing.save() //pour enregistrer un thing
        .then(() => res.status(201).json({ message: 'Objet enregistré !' }))
        .catch(error => res.status(400).json({ error }));
};

// exportation de la fonction modifyThing
exports.modifyThing = (req, res, next) => {
    Thing.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })// methode modifier. 1er argument l id de l'objet a modifier et le 2eme argument le nouvel objet(objet modifier)
        .then(() => res.status(200).json({ message: 'Objet modifié !' }))
        .catch(error => res.status(400).json({ error }));
};

// exportation de la fonction deleteThing
exports.deleteThing =(req, res, next) => {
    Thing.deleteOne({ _id: req.params.id }) //methode pour supprimer l'objet , elle prend l'objet de compraiseon comme argument ( _id: req.params.id)
        .then(() => res.status(200).json({ message: 'Objet supprimé !' }))
        .catch(error => res.status(400).json({ error }));
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
