const mysql = require('mysql');

// create a connection to the database
const connection = mysql.createConnection({
  host: process.env.MYSQL_ADDON_HOST,
  user: process.env.MYSQL_ADDON_USER,
  password: process.env.MYSQL_ADDON_PASSWORD,
  database: process.env.MYSQL_ADDON_DB,
  port:process.env.MYSQL_ADDON_PORT,
});

// connect to the database
connection.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL database!');
});

module.exports={connection}