const { IssueController } = require('./IssueController');

const controllers = {
  issue: IssueController,
};

const prepareControllers = (services) => {
  return (name) => {
    if (!controllers.hasOwnProperty(name) || !services.hasOwnProperty(name)) {
      throw new Error(`Unknown controller ${name}`);
    }

    const ControllerClass = controllers[name];
    const ServiceClass = services[name];
    const service = new ServiceClass();

    const controller = new ControllerClass(service, name);

    return controller;
  };
};

module.exports = { prepareControllers };
