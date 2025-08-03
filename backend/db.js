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
  host: process.env.PGHOST,        // Render's internal hostname
  user: process.env.PGUSER,        // your Render database username
  password: process.env.PGPASSWORD, // password from Render
  database: process.env.PGDATABASE, // your database name
  port: process.env.PGPORT,         // usually 5432
  ssl: {
    rejectUnauthorized: false       // required for Render SSL
  }
});

module.exports = pool;
