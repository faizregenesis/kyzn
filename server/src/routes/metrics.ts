import { Router } from 'express';
import { query } from '../db';


const router = Router();


router.get('/revenue', async (req, res) => {
const granularity = String(req.query.granularity || 'daily');
let dateTrunc = 'day';
if (granularity === 'weekly') dateTrunc = 'week';
if (granularity === 'monthly') dateTrunc = 'month';


const { rows } = await query(
`SELECT date_trunc($1, invoices.date::timestamp) AS bucket,
COALESCE(SUM(invoice_items.unit_price * invoice_items.quantity), 0) AS revenue_cents
FROM invoices
LEFT JOIN invoice_items ON invoices.id = invoice_items.invoice_id
GROUP BY bucket
ORDER BY bucket ASC`,
[dateTrunc]
);


res.json({ data: rows.map(r => ({ t: r.bucket, v: Number(r.revenue_cents) })) });
});


export default router;