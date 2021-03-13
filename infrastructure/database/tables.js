class Tables {

  init(connection) {
    this.connection = connection;
    this.createTableTreatment();
    this.createTablePet();
  }

  createTableTreatment() {
    const sql = `CREATE TABLE IF NOT EXISTS treatments (
      id int NOT NULL AUTO_INCREMENT,
      customer varchar(50) NOT NULL,
      pet varchar(20),
      service varchar(20) NOT NULL,
      status varchar(20) NOT NULL,
      scheduled_at timestamp NOT NULL,
      created_at timestamp NOT NULL,
      obs text,
      PRIMARY KEY(id)
    )`;

    this.connection.query(sql, (error) => {
      if (error) {
        console.error(error);
      } else {
        console.log('Table treatment was created with success');
      }
    });
  }

  createTablePet() {
    const sql = `CREATE TABLE IF NOT EXISTS pets (
      id int NOT NULL AUTO_INCREMENT,
      name VARCHAR(50),
      image VARCHAR(255),
      PRIMARY KEY (id)
    )`;

    this.connection.query(sql, error => {
      if (error) {
        console.error(error);
      } else {
        console.log('Table pets was created with success');
      }
    });
  }

}

module.exports = new Tables();
