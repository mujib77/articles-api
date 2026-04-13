import { Router, Request, Response } from 'express';
import pool from '../db';

const router = Router();

// GET /articles/search?q=backend
router.get('/search', async (req: Request, res: Response) => {
  const { q } = req.query;
  try {
    const result = await pool.query(
      `SELECT * FROM articles 
       WHERE to_tsvector('english', body) @@ to_tsquery('english', $1)`,
      [q]
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: 'Search failed' });
  }
});

// GET /articles/:id
router.get('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      'SELECT * FROM articles WHERE id = $1', [id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Not found' });
  }
});

// POST /articles
router.post('/', async (req: Request, res: Response) => {
  const { title, body } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO articles (title, body) VALUES ($1, $2) RETURNING *',
      [title, body]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Insert failed' });
  }
});

export default router;