const mysql = require('mysql2/promise');

const connection = mysql.createPool({
  host: 'srv443.hstgr.io',
  user: 'u914092881_testapi',
  password: 'Scorpions.,,1',
  database: 'u914092881_testapi'
});

module.exports = connection;