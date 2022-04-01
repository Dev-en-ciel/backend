const express = require('express');
//importation de mongoose
const mongoose = require('mongoose');

const app = express();
//importation des router
const stuffRoutes = require('./routes/stuff');
const userRoutes = require('./routes/user');

//importation pour acceder au path du server
const path = require('path');

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

//ajout du gestionaire de routage
app.use('/images', express.static(path.join(__dirname, 'images')));

//importation des routes du fichier stuff.js
app.use('/api/stuff', stuffRoutes);
app.use('/api/auth', userRoutes);

//exportation de l'application pour pouvoir y acceder depuis les autres fichiers
//notamment le server node
module.exports = app;