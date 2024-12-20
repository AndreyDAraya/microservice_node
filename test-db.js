import pg from "pg";
const { Pool } = pg;

const pool = new Pool({
  user: "admin",
  password: "admin123456",
  host: "localhost",
  port: 5432,
  database: "usersdb",
});

async function testConnection() {
  try {
    // Test connection
    const client = await pool.connect();
    console.log("Successfully connected to PostgreSQL");

    // Test users table
    const usersResult = await client.query("SELECT * FROM users");
    console.log("Users table exists. Row count:", usersResult.rowCount);

    // Test sessions table
    const sessionsResult = await client.query("SELECT * FROM sessions");
    console.log("Sessions table exists. Row count:", sessionsResult.rowCount);

    client.release();
    await pool.end();
  } catch (err) {
    console.error("Database connection error:", err);
  }
}

testConnection();
