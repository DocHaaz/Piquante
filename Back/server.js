// Variables d'environnement
require('dotenv').config();

// Importation des modules / packages
const http = require('http');
const app = require('./app');

    // Configuration du port

// Renvoie un port valide
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
const port = normalizePort(process.env.PORT);
app.set('port', port);

// Gestion des erreurs
const errorHandler = error => {
  if (error.syscall !== 'listen') {
    throw error;
  }
  const address = server.address();
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port: ' + port;
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' Autorisation refusée ');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' Adresse déjà utilisée ');
      process.exit(1);
      break;
    default:
      throw error;
  }
};

// Création du server
const server = http.createServer(app);

// Ecouteur d'évènement pour la gestion des erreur + console log du port utiliser
server.on('error', errorHandler);
server.on('listening', () => {
  const address = server.address();
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
  console.log('Listening on ' + bind);
});

// Ecoute du serveur sur le port configurer
server.listen(port);