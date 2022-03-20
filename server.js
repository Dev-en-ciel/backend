//importation du package 
const http = require('http');
//importer le fichier app.js
const app = require('./app');

//fonction qui renvoie un port valide qu'il soit sous la forme de numero ou de chaine
const normalizePort = val => {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }
  if (port >= 0) {
    return port;
  }
  return false;
};
// port utilisé pour l'ecoute.
//process.env.port => propose un port part defaut.
const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

//fonction  qui recherche les differente erreurs et les geres.
// elle est ensuite enregistrer dans le serveur
const errorHandler = error => {
  if (error.syscall !== 'listen') {
    throw error;
  }
  const address = server.address();
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port: ' + port;
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges.');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use.');
      process.exit(1);
      break;
    default:
      throw error;
  }
};

//creer un server, prend automatiquement 2 arguments (req => requete et res => reponse)
//cette methode prend en argument la fonction qui sera applée a chaque requéte
const server = http.createServer(app);

//ecouteur d'evenement
server.on('error', errorHandler);
server.on('listening', () => {
  const address = server.address();
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
  console.log('Listening on ' + bind);
});
//port utilisé
server.listen(port);
