const connection = require('../infrastructure/connection');
const moment = require('moment');

class Treatment {
  add(treatment, res) {
    const created_at = moment().format('YYYY-MM-DD HH:mm:ss');
    const scheduled_at = moment(treatment.scheduled_at, 'DD/MM/YYYY').format('YYYY-MM-DD HH:mm:ss');

    const scheduledAtValid = moment(scheduled_at).isSameOrAfter(created_at);
    const customerValid = treatment.customer.length >= 5;
    
    const validations = [
      {
        field: 'scheduled_at',
        valid: scheduledAtValid,
        message: 'Scheduled at must be greater than today'
      },
      {
        field: 'customer',
        valid: customerValid,
        message: 'Customer must have greater than or equal of 5 words'
      }
    ];
    
    const invalidFields = validations.filter(item => !item.valid);

    if(invalidFields.length) {
      res.status(400).json(invalidFields);
    } else {
      const newTreatment = {...treatment, created_at, scheduled_at};
      const sql = `INSERT INTO treatments SET ?`;
      connection.query(sql, newTreatment, (error, result) => {
        if (error) {
          res.status(400).json(error);
        } else {
          res.status(201).json({...treatment});
        }
      });
    }
  }

  list(res) {
    const sql = 'SELECT * FROM treatments';

    connection.query(sql, (error, result) => {
      if(error) {
        res.status(400).json(error);
      } else {
        res.status(200).json(result)
      }
    });

  }

  findById(id, res) {
    const sql = `SELECT * FROM treatments WHERE id=${id}`;

    connection.query(sql, (error, result) => {

      if(error) {
        res.status(400).json(error);
      } else {
        const treatment = result[0];
        res.status(200).json(treatment);
      }

    });
  }

  update(id, values, res) {
    const sql = 'UPDATE treatments SET ? WHERE id=?';

    if(values.scheduled_at) {
      values.scheduled_at = moment(values.scheduled_at, 'DD/MM/YYYY').format('YYYY-MM-DD HH:mm:ss');
    }

    connection.query(sql, [values, id], (error, results) => {

      if(error) {
        res.status(400).json(error);
      } else {
        res.status(200).json({...values, id});
      }

    });
  }

  delete(id, res) {
    const sql = 'DELETE FROM treatments WHERE id=?';

    connection.query(sql, id, (error, result) => {
      if(error) {
        res.status(400).json(error);
      } else {
        res.status(200).json({id});
      }
    })
  }

}

module.exports = new Treatment
