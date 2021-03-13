const customExpress = require('./configs/customExpress');
const connection = require('./infrastructure/database/connection');
const Tables = require('./infrastructure/database/tables.js');

connection.connect(error => {
  if(error) {
    console.log('Error on connect with database');
    console.error(error);
  } else {
    console.log('Connection with database established with success');
    Tables.init(connection);

    const app = customExpress();
    app.listen(3000, () => console.log('Server running on port 3000'));
  }
});

