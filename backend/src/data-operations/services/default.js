const defaultOptions = {
  disableValidations: false,
};

class Service {
  model;
  options;

  constructor(model, options = defaultOptions) {
    this.model = model;
    this.options = options;
  }
}

module.exports = { Service };
