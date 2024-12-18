const { Client } = require('pg');
require('dotenv').config({ path: './.env' });

const pool = new Client({
  user: process.env.AVIEN_DB_USER,
  host: process.env.AVIEN_DB_HOST,
  database: process.env.AVIEN_DB_NAME,
  password: process.env.AVIEN_DB_PASSWORD,
  port: 12436,
  ssl: {
    rejectUnauthorized: true,
    ca: process.env.AVIEN_SSL_CERT
  },
});

(async () => {
  try {
    await pool.connect();
    console.log('Connected to Avien PostgreSQL!');
  } catch (error) {
    console.error('Error connecting to Avien PostgreSQL:', error);
    process.exit(1); // Exit the process if the database connection fails
  }
})();

module.exports = pool;