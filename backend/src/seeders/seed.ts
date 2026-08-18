import bcrypt from 'bcryptjs';
import { pool } from '../config/db.js';

export async function initDatabaseAndSeed(): Promise<void> {
  try {
    // 1. Create users table if not exists
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        email VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        name VARCHAR(255) NOT NULL,
        role VARCHAR(50) NOT NULL DEFAULT 'admin',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    `);

    // 2. Check if default admin exists
    const [rows]: any = await pool.query('SELECT * FROM users WHERE email = ?', ['admin@example.com']);

    if (rows.length === 0) {
      const hashedPassword = await bcrypt.hash('Admin123!', 10);
      await pool.query(
        'INSERT INTO users (email, password, name, role) VALUES (?, ?, ?, ?)',
        ['admin@example.com', hashedPassword, 'System Admin', 'admin']
      );
      console.log('[Seeder] Default Admin user created: admin@example.com / Admin123!');
    } else {
      console.log('[Seeder] Default Admin user already exists.');
    }
  } catch (err: any) {
    console.error('[Seeder] Error during database initialization/seeding:', err);
    throw err;
  }
}
