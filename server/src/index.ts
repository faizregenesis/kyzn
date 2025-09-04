import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { pool } from './db';
import invoices from './routes/invoices';
import metrics from './routes/metrics';
import products from './routes/products'
import fs from 'fs';
import path from 'path';


dotenv.config();


const app = express();
app.use(cors());
app.use(express.json());


app.get('/health', (_req, res) => res.json({ ok: true }));
app.use('/api/invoices', invoices);
app.use('/api/metrics', metrics);
app.use("/products", products);


const port = Number(process.env.PORT || 4000);


// Auto-run schema on boot (dev convenience)
const schemaSql = fs.readFileSync(path.join(process.cwd(), 'src', 'schema.sql'), 'utf-8');
(async () => {
try {
await pool.query(schemaSql);
app.listen(port, () => console.log(`Server on :${port}`));
} catch (e) {
console.error('Failed to init schema', e);
process.exit(1);
}
})();