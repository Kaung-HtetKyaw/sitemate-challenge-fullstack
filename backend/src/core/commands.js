const createWebServer = require('./createWebServer');
const config = require('./config');

const composeCommand = (...shutdowns) => {
  const onExit = () => {
    Promise.all(shutdowns.map((shutdown) => shutdown())).then(() =>
      process.exit(0)
    );
  };

  process.on('SIGTERM', onExit);
  process.on('SIGINT', onExit);
};

const startServerCommand = async () => {
  const { httpServer } = await createWebServer();

  httpServer.listen(config.port, () => {
    console.log(`${config.name} is listening on port: ${config.port}`);
  });

  return () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        httpServer.close(resolve);
      }, 1000);
    });
  };
};

module.exports = { startServerCommand, composeCommand };
