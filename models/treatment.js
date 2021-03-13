const moment = require('moment');
const repository = require('../repositories/treatments');

class Treatment {
  add(treatment) {
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
      return new Promise((resolve, reject) => reject(invalidFields));
    } else {
      const newTreatment = {...treatment, created_at, scheduled_at};
      return repository.add(newTreatment).then(_ => {
        return {...treatment}
      });
    }
  }

  list() {
    return repository.list();
  }

  findById(id) {
    return repository.findById(id);
  }

  update(id, values) {
    if(values.scheduled_at) {
      values.scheduled_at = moment(values.scheduled_at, 'DD/MM/YYYY').format('YYYY-MM-DD HH:mm:ss');
    }

    return repository.update(id, values);
  }

  delete(id) {
    return repository.delete(id);
  }

}

module.exports = new Treatment
