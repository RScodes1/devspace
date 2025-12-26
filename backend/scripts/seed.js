const { pool, connectPostgres, disconnectPostgres } = require("../src/config/postgres");
const bcrypt = require("bcryptjs");

(async () => {
  try {
    await connectPostgres();

    console.log("🔹 Seeding initial data...");

    // Seed roles in memberships (optional, since roles are strings)
    // Seed default admin user
    const passwordHash = await bcrypt.hash("password123", 10);

    const res = await pool.query(
      `INSERT INTO users (name, email, password_hash)
       VALUES ($1, $2, $3)
       ON CONFLICT (email) DO NOTHING
       RETURNING *`,
      ["Admin User", "admin@devspace.com", passwordHash]
    );

    console.log("✅ Seeded user:", res.rows[0]);

    console.log("✅ Seeding completed.");
  } catch (error) {
    console.error("❌ Seeding failed:", error);
  } finally {
    await disconnectPostgres();
    process.exit(0);
  }
})();
