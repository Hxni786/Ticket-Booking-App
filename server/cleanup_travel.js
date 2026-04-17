const mysql = require('mysql2/promise');
require('dotenv').config();

async function cleanup() {
  const conn = await mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'ticket_booking'
  });

  // First show all travel entries
  const [before] = await conn.execute("SELECT id, title FROM movies WHERE category = 'travel'");
  console.log('All travel entries:');
  before.forEach(r => console.log('  ID:', r.id, '| Title:', r.title));

  // Delete the specific ones with arrow characters
  const [result] = await conn.execute(
    "DELETE FROM movies WHERE category = 'travel' AND (title LIKE '%Lahore%Karachi%' OR title LIKE '%Karachi%Istanbul%' OR title LIKE '%Islamabad%Dubai%')"
  );
  console.log('\nDeleted rows:', result.affectedRows);

  // Show remaining
  const [after] = await conn.execute("SELECT id, title FROM movies WHERE category = 'travel'");
  console.log('\nRemaining travel entries:');
  after.forEach(r => console.log('  ID:', r.id, '| Title:', r.title));

  await conn.end();
}

cleanup().catch(console.error);
