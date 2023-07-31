const mysql = require('mysql');

// create a connection to the database
const connection = mysql.createConnection({
  host: 'bkhtxff8aglngo7l4o0v-mysql.services.clever-cloud.com',
  user: 'uxlr6hc0wfoi5i80',
  password: 'oP6IUD3Wq4YXgqyTOwZ5',
  database: 'bkhtxff8aglngo7l4o0v',
  port:"3306",
});

// connect to the database
connection.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL database!');
});

module.exports={connection}