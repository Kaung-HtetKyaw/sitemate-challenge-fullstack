/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */

const { prepareControllers } = require('../controllers');
const { createServices } = require('../data-operations/services');
const { getDbClient } = require('./client');

if (!global.db) {
  // update the global store
  global.db = { context: null, promise: null };
}

let cached = null;

const getDatabaseContext = async () => {
  if (cached && global.db.context) {
    return cached;
  }

  if (!global.db.promise) {
    const init = async () => {
      // get regular client first
      await getDbClient();

      return {};
    };

    // get the promise
    global.db.promise = init();
  }

  // wait for it
  // and assigned it globally
  global.db.context = await global.db.promise;

  const services = createServices();
  const getController = prepareControllers(services);
  // get services

  // update the cache
  cached = {
    ...global.db.context,
    services,
    getController,
  };

  // finally return the cache
  return cached;
};

module.exports = { getDatabaseContext };
