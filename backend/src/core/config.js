// TODO: add(refactor) utility functions to get value/default value from env variables
// TODO: eg. getString(getPrefix('NAME'), 'Backend Server')
const config = {
  name: process.env.NAME || 'Backend Server',
  port: process.env.PORT || 3000,
  publicPath: process.env.PUBLIC_PATH || '/public/',

  // gzip module
  gzip: process.env.GZIP || true,

  // cors
  allowedDomains: process.env.ALLOWED_DOMAINS
    ? process.env.ALLOWED_DOMAINS.split(',')
    : [],

  // server runtime
  db: {
    uri: process.env.DB_URI,
    name: process.env.DB_NAME || 'app',
  },
};

module.exports = config;
