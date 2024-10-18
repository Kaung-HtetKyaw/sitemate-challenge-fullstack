class Controller {
  #service;
  #name;

  constructor(service, name = 'Document') {
    this.#service = service;
    this.#name = name;
    this.create = this.create.bind(this);
    this.update = this.update.bind(this);
    this.getById = this.getById.bind(this);
    this.getList = this.getList.bind(this);
    this.destroy = this.destroy.bind(this);
  }

  async create(req, res, next) {
    try {
      const document = await this.#service.create(req.body);
      return res.status(200).json(document);
    } catch (error) {
      res.status(500).json({ message: 'ERROR', error: error.message });
    }
  }

  async getList(req, res, next) {
    try {
      const documents = await this.#service.findAll();

      return res.status(200).json({ data: documents });
    } catch (error) {
      res.status(500).json({ message: 'ERROR', error: error.message });
    }
  }

  async getById(req, res, next) {
    try {
      const { id } = req.params;

      const foundDocument = await this.#service.findById(id);
      if (!foundDocument) {
        return res.status(404).json({ message: 'Issue not found!' });
      }

      res.status(200).json({
        data: foundDocument,
      });
    } catch (error) {
      res.status(500).json({ message: 'ERROR', error: error.message });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      const foundDocument = await this.#service.updateById(id, req.body);
      if (!foundDocument) {
        return res.status(404).json({ message: 'Issue not found!' });
      }

      res.status(200).json({ data: foundDocument });
    } catch (error) {
      res.status(500).json({ message: 'ERROR', error: error.message });
    }
  }

  async destroy(req, res) {
    try {
      const { id } = req.params;

      const deleted = await this.#service.destroy(id);
      if (!deleted) {
        return res.status(404).json({ message: `${this.#name} not found!` });
      }

      res.status(200).json({
        message: `${this.#name} successfully deleted!`,
      });
    } catch (error) {
      res.status(500).json({ message: 'ERROR', error: error.message });
    }
  }
}

module.exports = { Controller };
