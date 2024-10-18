const { Router } = require('express');
const IssueValidator = require('../data-operations/services/issues/validators');

const issueRouter = ({ controller }) => {
  const router = Router();

  router.get('/', controller.getList);

  router.get('/:id', IssueValidator.getById, controller.getById);

  router.post('/', IssueValidator.create, controller.create);

  router.patch('/:id', IssueValidator.update, controller.update);

  router.delete('/:id', IssueValidator.destroy, controller.destroy);

  return router;
};

module.exports = issueRouter;
