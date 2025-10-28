import pkg from "pg";
const { Client } = pkg;

const client = new Client({
  user: "postgres",
  host: "localhost",
  database: "github",
  password: "12345",
  port: 5432,
});

async function setupDB() {
  try {
    await client.connect();
    console.log("✅ Connected to PostgreSQL");

    await client.query(`
      CREATE TABLE IF NOT EXISTS repositories (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        full_name TEXT NOT NULL,
        stars_count INT,
        url TEXT,
        fetched_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    console.log("✅ Table created successfully");
  } catch (err) {
    console.error("❌ Error creating table:", err);
  } finally {
    await client.end();
    console.log("🔌 Connection closed");
  }
}

setupDB();
