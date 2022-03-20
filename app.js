const express = require('express');
//importation de mongoose
const mongoose = require('mongoose');
const Thing = require('./models/thing');
const app = express();

mongoose.connect('mongodb+srv://francko:ZnlFMouBv2sJdKMx@test1.i9df7.mongodb.net/test1?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

//Middleware qui donne acce au corp de la requete
app.use(express.json());

//middleware general qui sera appliqué à toutes les routes ZnlFMouBv2sJdKMx
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');  //definit qui peut acceder a cette route * signe qui veut dire tout le monde
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'); //donne acces a certain en-tete
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');//donne acces a certaines methodes
  //appel de next qui permet de terminer la requete
  //d'envoyer la reponse
  //de passer a la suivante
  next();
});

app.post('/api/stuff', (req, res, next) => {
  delete req.body._id; //on retire le champ id du corp de la requete
  const thing = new Thing({
    ...req.body //les 3 petits point = spread est utilisé pour faire une copie de tous les element de req
  });
  thing.save() //pour enregistrer un thing
    .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
    .catch(error => res.status(400).json({ error }));
});

//modification de l'objet
app.put('/api/stuff/:id', (req, res, next) => {
  Thing.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })// methode modifier. 1er argument l id de l'objet a modifier et le 2eme argument le nouvel objet(objet modifier)
    .then(() => res.status(200).json({ message: 'Objet modifié !'}))
    .catch(error => res.status(400).json({ error }));
});

//route delete 
app.delete('/api/stuff/:id', (req, res, next) => {
  Thing.deleteOne({ _id: req.params.id }) //methode pour supprimer l'objet , elle prend l'objet de compraiseon comme argument ( _id: req.params.id)
    .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
    .catch(error => res.status(400).json({ error }));
});

// route pour récuperer un objet
app.get('/api/stuff/:id', (req, res, next) => { //requete GET pour ne répondre qu'aux demande get
  Thing.findOne({ _id: req.params.id }) //methode pour trouver le thing unique avec le meme id que le parametre de la requete
    .then(thing => res.status(200).json(thing)) // si on trouve le thing dans la base de donnée => envoue au frontend
    .catch(error => res.status(404).json({ error })); // si on ne trouve pas l'objet => erreur envoyé au frontend
});


//middleware qui requete la route api/stuff
app.get('/api/stuff', (req, res, next) => {
  Thing.find() //pour retourner les things
    .then(things => res.status(200).json(things))
    .catch(error => res.status(400).json({ error }));
});

//exportation de l'application pour pouvoir y acceder depuis les autres fichiers
//notamment le server node
module.exports = app;