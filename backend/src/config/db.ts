import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

export const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'secret',
  database: process.env.DB_NAME || 'starter_db',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export async function checkDbConnection(retries = 10, delayMs = 3000): Promise<boolean> {
  for (let i = 1; i <= retries; i++) {
    try {
      const connection = await pool.getConnection();
      console.log(`[DB] Connected to MySQL successfully (host: ${process.env.DB_HOST || 'localhost'})`);
      connection.release();
      return true;
    } catch (err: any) {
      console.warn(`[DB] Connection attempt ${i}/${retries} failed: ${err.message}. Retrying in ${delayMs}ms...`);
      if (i === retries) {
        throw new Error(`Failed to connect to MySQL database after ${retries} attempts.`);
      }
      await new Promise((res) => setTimeout(res, delayMs));
    }
  }
  return false;
}
