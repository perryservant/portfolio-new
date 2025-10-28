require('dotenv').config();
const { Pool } = require('pg');

let pool;

if (process.env.NODE_ENV === 'production') {
  
    pool = new Pool({
        connectionString: process.env.DATABASE_URL,
        ssl: {
        rejectUnauthorized: false
        }
    });
} else {
  
    pool = new Pool({
        user: process.env.USER_DB,
        host: process.env.HOST_DB,
        database: process.env.DB_NAME,
        password: process.env.PASSWORD_DB,
        port: process.env.PORT_DB
    });
}

module.exports = pool;