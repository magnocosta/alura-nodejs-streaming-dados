const customExpress = require('./configs/customExpress');
const connection = require('./infraestructure/connection');
const Tables = require('./infraestructure/tables.js');

connection.connect(error => {
  if(error) {
    console.log('Error on connect with database');
    console.error(error);
  } else {
    console.log('Connection with database stablished with success');
    Tables.init(connection);

    const app = customExpress();
    app.listen(3000, () => console.log('Servidor rodando na porta 3000'));
  }
});

