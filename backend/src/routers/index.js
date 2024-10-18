const IssueController = require('../controllers/IssueController');
const IssueService = require('../data-operations/services/issues');
const issueRouter = require('./issues');

const connectRouters = ({ expressServer, getController }) => {
  // issue route
  expressServer.use(
    '/api/issues',
    issueRouter({ controller: getController('issue') })
  );
};

module.exports = { connectRouters };
