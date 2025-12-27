const { Pool } = require("pg");
const { env } = require("./env");

const pool = new Pool({
  host: env.POSTGRES_HOST,
  port: env.POSTGRES_PORT,
  database: env.POSTGRES_DB,
  user: env.POSTGRES_USER,
  password: env.POSTGRES_PASSWORD,
  ssl:
    env.NODE_ENV === "production"
      ? { rejectUnauthorized: false }
      : false,
  max: 10, // max connections
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000
});

const connectPostgres = async () => {
  try {
    const client = await pool.connect();
    await client.query("SELECT 1");
    client.release();
    console.log("✅ PostgreSQL connected");
  } catch (error) {
    console.error("PostgreSQL connection failed");
    console.error(error);
    process.exit(1);
  }
};

const disconnectPostgres = async () => {
  await pool.end();
  console.log("PostgreSQL pool closed");
};

module.exports = {
  pool,
  connectPostgres,
  disconnectPostgres
};
