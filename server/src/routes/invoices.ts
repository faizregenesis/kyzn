import { Router, Request, Response } from 'express';
import { query } from '../db';

const router = Router();

// CREATE invoice
router.post('/', async (req: Request, res: Response) => {
  try {
    const { date, customer_name, salesperson_name, notes, products } = req.body;
    console.log("req.body", req.body)

    if (!date || !customer_name || !salesperson_name || !products?.length) {
      return res.status(400).json({ error: 'Invalid input' });
    }

    // Insert invoice
    const invoiceResult = await query<{ id: number }>(
      `INSERT INTO invoices (date, customer_name, salesperson_name, notes)
       VALUES ($1, $2, $3, $4) RETURNING id`,
      [date, customer_name, salesperson_name, notes ?? null]
    );

    const invoiceId = invoiceResult.rows[0].id;
    console.log("invoiceId--->", invoiceId)

    // Insert products
for (const p of products) {
  try {
    const x = await query(
      `INSERT INTO invoice_items (invoice_id, product_name, quantity, unit_price)
       VALUES ($1, $2, $3, $4) RETURNING *`,
      [invoiceId, p.name, p.quantity, p.price]
    );
    console.log("Inserted item ->", x.rows[0]);
  } catch (err) {
    console.error("Insert product error:", err);
  }
}
    

    res.status(201).json({ message: 'Invoice created', invoiceId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// GET invoices with pagination (lazy loading)
router.get('/', async (req: Request, res: Response) => {
  try {
    /*
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const offset = (page - 1) * limit;

    const { rows } = await query(
      `SELECT i.id, i.customer_name, i.salesperson_name, i.notes,
              COALESCE(SUM(ii.quantity * ii.unit_price), 0) as total_amount
       FROM invoices i
       LEFT JOIN invoice_items ii ON i.id = ii.invoice_id
       GROUP BY i.id
       ORDER BY i.date DESC
       LIMIT $1 OFFSET $2`,
      [limit, offset]
    );
    */
   let queryStr = `
  SELECT i.id, i.customer_name, i.salesperson_name, i.notes,
         COALESCE(SUM(ii.quantity * ii.unit_price), 0) as total_amount
  FROM invoices i
  LEFT JOIN invoice_items ii ON i.id = ii.invoice_id
  GROUP BY i.id
  ORDER BY i.date DESC
`;

let params: any[] = [];

if (req.query.page && req.query.limit) {
  const page = parseInt(req.query.page as string);
  const limit = parseInt(req.query.limit as string);
  const offset = (page - 1) * limit;
  queryStr += ` LIMIT $1 OFFSET $2`;
  params = [limit, offset];
}

const { rows } = await query(queryStr, params);

    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;
