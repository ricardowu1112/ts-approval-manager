// db.ts
import { Pool } from "pg";
import "../dotenv"; // 这会加载环境变量

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// console.log("pool", pool);

pool.on("connect", () => {
  console.log("Connected to the database");
});

// pool.query("SELECT NOW()", (err, res) => {
//   if (err) {
//     console.error("Error executing test query", err.stack);
//   } else {
//     console.log("Test query result:", res.rows);
//   }
// });

// Function to get table names
export const getTableNames = async () => {
  try {
    const res = await pool.query(`
      SELECT table_name
      FROM information_schema.tables
      WHERE table_schema = 'public'
      AND table_type = 'BASE TABLE';
    `);
    console.log("Table names:", res.rows);
    return res.rows;
  } catch (err) {
    if (err instanceof Error) {
      // Type guard
      console.error("Error fetching table names", err.message);
    } else {
      console.error("Unexpected error", err);
    }
  }
};

export const query = (text: string, params?: any[]) => pool.query(text, params);
