const { Pool } = require('pg');
const pool = new Pool({
  user: 'jack',
  password: 'mytestdb1',
  host: '192.168.50.116',
  port: 5432,
  database: 'form_data'
});

const tables = [
  {
    name: 'platform_users',
    schema: `
      CREATE TABLE IF NOT EXISTS platform_users (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) NOT NULL UNIQUE,
        country VARCHAR(100),
        postal_code VARCHAR(20),
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `
  }
  // Add more tables to the array here
];

async function initializeTables() {
  try {
    for (const table of tables) {
      await pool.query(table.schema);
      console.log(`✓ ${table.name} table created`);
    }
  } catch (err) {
    console.error('Error initializing tables:', err);
  }
}

module.exports = { pool, initializeTables };