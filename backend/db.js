const { Pool } = require("pg");
require("dotenv").config();

// const pool = new Pool({
//   host: process.env.DB_HOST || "localhost" ,
//   user: process.env.DB_USER || "postgres",
//   password: process.env.DB_PASSWORD || "password",
//   database: process.env.DB_NAME || "foodweb",
//   port: process.env.DB_PORT || 5432,
// });
const pool = new Pool({
host: process.env.PGHOST,
user: process.env.PGUSER,
password: process.env.PGPASSWORD,
database: process.env.PGDATABASE,
port: process.env.PGPORT,
ssl: {
rejectUnauthorized: false, // required by Render
},
});

module.exports = pool;
