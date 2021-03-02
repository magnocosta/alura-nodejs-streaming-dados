module.exports = app => {
  app.get('/atendimentos', (req, res) => res.send('Parabens, vc esta realizando um GET'));
  app.post('/atendimentos', (req, res) => {
    console.log(req.body);
    res.send('Parabens, vc esta realizando um POST');
  })
}
