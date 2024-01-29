const client = require('./client');

const databaseName = 'reddit';

const createDB = () => {
  client.connect();

  client.query(`CREATE DATABASE ${databaseName}`)
    .then(() => {
      console.log(`Database ${databaseName} created successfully`);
    })
    .catch((error) => {
      console.error(`Error creating database: ${error.message}`);
    })
    .finally(() => {
      client.end();
    });
}

const dropDB = () => {
  client.connect();

  client.query(`DROP DATABASE ${databaseName}`)
    .then(() => {
      console.log(`Database ${databaseName} dropped successfully`);
    })
    .catch((error) => {
      console.error(`Error dropping database: ${error.message}`);
    })
    .finally(() => {
      client.end();
    });
}


module.exports = {
  client,
  databaseName,
  createDB,
  dropDB
};


