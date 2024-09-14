// db.js
const { Pool } = require('pg');

const pool = new Pool({
    host: 'localhost',
    port: 5432,
    user: 'postgres', // Use a valid user
    password: 'Tanmay@4600', // Ensure this password is correct
    database: 'test',
});

pool.on('error', (err, client) => {
    console.error('Unexpected error on idle client', err);
    process.exit(-1);
});

module.exports = pool;
