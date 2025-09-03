import { Pool, QueryResultRow } from 'pg';
import dotenv from 'dotenv';
import path from 'path';

// pastikan dotenv baca dari root "server/.env"
dotenv.config({ path: path.resolve(__dirname, '../.env') });

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export async function query<T extends QueryResultRow = any>(
  text: string,
  params?: any[]
): Promise<{ rows: T[] }> {
  const client = await pool.connect();
  try {
    const res = await client.query<T>(text, params);
    return { rows: res.rows };
  } finally {
    client.release();
  }
}
