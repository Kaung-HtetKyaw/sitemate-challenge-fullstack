const express = require('express');
const http = require('http');
const { connectRouters } = require('../routers');
const config = require('./config');
const compression = require('compression');
const cors = require('cors');
const { getDatabaseContext } = require('../database/instance');
const { prepareControllers } = require('../controllers');

const createWebServer = async () => {
  const expressServer = express();

  // disable informational headers
  expressServer.disable('x-powered-by');

  if (config.gzip) {
    // enable compression
    // we might want to disable if it's delegated to a reverse proxy
    expressServer.use(compression());
  }

  // enable JSON and url encoded support
  expressServer.use(express.json());
  expressServer.use(express.urlencoded({ extended: true }));

  // serve static files
  expressServer.use('/public', express.static('public'));

  // apply cors
  // TODO: fine grained cors
  expressServer.use(cors());

  // create the http server
  const httpServer = http.createServer({ keepAlive: true }, expressServer);

  // services
  const { getController } = await getDatabaseContext();

  // routes
  connectRouters({ getController, expressServer });

  // then here comes our error handler
  expressServer.use((error, request, response, next) => {
    // print it for logs
    console.error(error);
    // answer as 500 response
    response.status(500).send('Internal error');
  });

  return { httpServer, expressServer };
};

module.exports = createWebServer;
