const Treatment = require('../models/treatment');

module.exports = app => {
  app.get('/atendimentos', (req, res) => res.send('Parabens, vc esta realizando um GET'));
  app.post('/atendimentos', (req, res) => {
    console.log(req.body);
    const treatment = req.body;
    Treatment.add(treatment);
    res.send('Parabens, vc esta realizando um POST');
  })
}
