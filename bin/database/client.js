const pg = require('pg');

const client = new pg.Client({
  host: 'localhost',
  user: 'postgres',
  port: 5432,
  password:"rohit@2002"
});

module.exports = client;
