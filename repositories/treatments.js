const query = require('../infrastructure/database/queries');

class Treatments {

    add(treatment) {
        const sql = 'INSERT INTO treatments SET ?';
        return query(sql, treatment);
    }

    list() {
        const sql = 'SELECT * FROM treatments';
        return query(sql);
    }

    findById(id) {
        const sql = `SELECT * FROM treatments WHERE id=${id}`;
        return query(sql).then(result => result[0]);
    }

    update(id, values) {
        const sql = 'UPDATE treatments SET ? WHERE id=?';
        return query(sql, [values, id]);
    }

    delete(id) {
        const sql = 'DELETE FROM treatments WHERE id=?';
        return query(sql, id);
    }

}

module.exports = new Treatments();
