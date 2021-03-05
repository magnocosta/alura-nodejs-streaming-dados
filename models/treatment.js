const connection = require('../infraestructure/connection');

class Treatment {

  add(treatment) {
    const sql = `INSERT INTO treatments SET ?`;
    connection.query(sql, treatment, (error, results) => {
      if (error) {
        console.log(error);
      } else {
        console.log(results);
      }
    });
  }

}

module.exports = new Treatment
