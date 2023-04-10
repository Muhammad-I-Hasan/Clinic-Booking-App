const mysql = require('mysql');


const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "clinicdb"
})

db.connect();

module.exports = db