const connection = require('../infraestructure/connection');
const moment = require('moment');

class Treatment {
  add(treatment) {
    const created_at = moment().format('YYYY-MM-DD HH:mm:ss');
    const scheduled_at = moment(treatment.scheduled_at, 'DD/MM/YYYY').format('YYYY-MM-DD HH:mm:ss');
    const newTreatment = {...treatment, created_at, scheduled_at};
    const sql = `INSERT INTO treatments SET ?`;
    connection.query(sql, newTreatment, (error, results) => {
      if (error) {
        console.log(error);
      } else {
        console.log(results);
      }
    });
  }

}

module.exports = new Treatment
