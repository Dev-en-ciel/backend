//Importation d'express 
const express = require('express');

//importation de mongoose
const mongoose = require('mongoose');

//importation du model creer de lu fichier thing.js
const thing = require('./models/thing');

//application express
const app = express();

//connction de lapi a la base de donnée mongoDB
mongoose.connect('mongodb+srv://francko:pYtCoEIuNDwcN9zs@test.9pzhr.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

//Middleware qui donne acce au corp de la requete
app.use(express.json());

//middleware general qui sera appliqué à toutes les routes
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*'); //definit qui peut acceder a cette route * signe qui veut dire tout le monde
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'); //donne acces a certain en-tete
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');//donne acces a certaines methodes
  //appel de next qui permet de terminer la requete
  //d'envoyer la reponse
  //de passer a la suivante
  next();
});

//middleware qui repondra uniquement au requete de type post
app.post('/api/stuff', (req, res, next) => {
  delete req.body._id;//on retire le champ id du corp de la requete
  const thing = new Thing({
    ...req.body//les 3 petits point = spread est utilisé pour faire une copie de tous les element de req.body
  });
  thing.save()//enregistre les données dans la base
    .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
    .catch(error => res.status(400).json({ error }));
});

//middleware qui requete la route api/stuff
app.get('/api/stuff', (req, res, next) => {
  //tableau contenant un objet
  const stuff = [
    {
      _id: 'oeihfzeoi',
      title: 'Mon premier objet',
      description: 'Les infos de mon premier objet',
      imageUrl: 'https://cdn.pixabay.com/photo/2019/06/11/18/56/camera-4267692_1280.jpg',
      price: 4900,
      userId: 'qsomihvqios',
    },
    {
      _id: 'oeihfzeomoihi',
      title: 'Mon deuxième objet',
      description: 'Les infos de mon deuxième objet',
      imageUrl: 'https://cdn.pixabay.com/photo/2019/06/11/18/56/camera-4267692_1280.jpg',
      price: 2900,
      userId: 'qsomihvqios',
    },
  ];
  //attribut la reponse 200 et renvoie le json avec le stuff (tableau)
  res.status(200).json(stuff);
});
//exportation de l'application pour pouvoir y acceder depuis les autres fichiers
//notamment le server node
module.exports = app;