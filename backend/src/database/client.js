const mongoose = require('mongoose');
const config = require('../core/config');

const getDbClient = () => {
  return mongoose.connect(config.db.uri, { dbName: config.db.name });
};

module.exports = { getDbClient };
