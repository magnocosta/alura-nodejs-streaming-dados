const Treatment = require('../models/treatment');

module.exports = app => {
  app.get('/treatments', (req, res) => {
    Treatment.list(res);
  });

  app.get('/treatments/:id', (req, res) => {
    const id = parseInt(req.params.id);
    Treatment.findById(id, res);
  });

  app.post('/treatments', (req, res) => {
    const treatment = req.body;
    Treatment.add(treatment, res);
  });

  app.patch('/treatments/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const values = req.body;
    Treatment.update(id, values, res);
  });

  app.delete('/treatments/:id', (req, res) => {
    const id = parseInt(req.params.id);
    Treatment.delete(id, res);
  });

}
