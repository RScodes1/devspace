const { Pool } = require("pg");
const { env } = require("./env");

const pool = new Pool({
  connectionString: env.POSTGRES_URL,
  ssl: {
    rejectUnauthorized: false, // allow Render SSL
  },
});


const connectPostgres = async () => {
  try {
    const client = await pool.connect();
    await client.query("SELECT 1");
    client.release();
    console.log("PostgreSQL connected");
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
