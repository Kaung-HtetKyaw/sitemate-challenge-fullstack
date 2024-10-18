const IssueService = require('./issues');

const createServices = () => {
  return {
    issue: IssueService,
  };
};

module.exports = { createServices };
