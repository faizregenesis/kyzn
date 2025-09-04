import { Router } from 'express';
import { query } from '../db';


const router = Router();


router.get('/search', async (req, res) => {
try {
    const q = (req.query.query as string) || "";
    if (!q) return res.json([]);
    const result = await query(
       `SELECT id, name, unit_price 
       FROM products 
       WHERE name ILIKE $1 
       ORDER BY name 
       LIMIT 10`,
      [`%${q}%`]
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch products" });
  }
});


export default router;