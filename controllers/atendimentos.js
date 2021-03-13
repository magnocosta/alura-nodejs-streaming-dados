const Treatment = require('../models/treatment');

module.exports = app => {
  app.get('/treatments', (req, res) => {
    Treatment.list()
        .then(treatment => res.json(treatment))
        .catch(error => res.status(400).json(error));
  });

  app.get('/treatments/:id', (req, res) => {
    const id = parseInt(req.params.id);
    Treatment.findById(id)
        .then(treatment => res.json(treatment))
        .catch(error => res.status(400).json(error));
  });

  app.post('/treatments', (req, res) => {
    const treatment = req.body;
    Treatment.add(treatment)
        .then(treatment => res.status(201).json(treatment))
        .catch(error => res.status(400).json(error));
  });

  app.patch('/treatments/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const values = req.body;
    Treatment.update(id, values)
        .then(_ => res.json(id))
        .catch(error => res.status(400).json(error));
  });

  app.delete('/treatments/:id', (req, res) => {
    const id = parseInt(req.params.id);
    Treatment.delete(id)
        .then(_ => res.json(id))
        .catch(error => res.status(400).json(error));
  });

}
