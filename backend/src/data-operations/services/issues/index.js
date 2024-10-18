const { IssueModel } = require('./schema');
const { Service } = require('../default');

const defaultOptions = {
  disableValidations: false,
};

class IssueService extends Service {
  constructor(options = defaultOptions) {
    super(IssueModel, options);
  }

  create(data) {
    return this.model.create(data);
  }

  async updateById(id, data) {
    const foundIssue = await this.model.findById(id);
    if (!foundIssue) {
      return null;
    }

    return foundIssue.set(data).save();
  }

  async destroy(id) {
    const foundIssue = await this.model.findById(id);
    if (!foundIssue) {
      return false;
    }

    await foundIssue.deleteOne();

    return true;
  }

  findAll() {
    return this.model.find();
  }

  findById(id) {
    return this.model.findById(id);
  }
}

module.exports = IssueService;
