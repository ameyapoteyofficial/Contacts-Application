const { Pool, Client } = require('pg')
const credentials = require('./credentials');
const pool = new Pool({
  user: credentials.username,
  host: credentials.server,
  database: credentials.database,
  password: credentials.password,
  port: 5432,
  max:10,
  idleTimeoutMillis:30000
})

module.exports.pool = pool;
