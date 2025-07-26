import express from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { db } from './db';
import { users } from './db/schema';
import { eq } from 'drizzle-orm';
dotenv.config();

const app = express();
app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ✅ Serve HTML from admin folder
app.use('/admin', express.static(path.join(__dirname, '..', 'admin')));

app.post('/admin/login', (req, res) => {
  const { username, password } = req.body;
  if (username === process.env.ADMIN_USERNAME && password === process.env.ADMIN_PASSWORD) {
    const token = jwt.sign({ username }, process.env.JWT_SECRET);
    return res.json({ token });
  }
  res.status(401).json({ error: 'Invalid credentials' });
});

app.get('/admin/users', async (req, res) => {
  const data = await db.select().from(users);
  res.json(data);
});

app.post('/admin/users/:id/pay', async (req, res) => {
  const { amount } = req.body;
  const { id } = req.params;
  await db.update(users).set({ balance: db.raw(`balance + ${amount}`) }).where(eq(users.id, id)).run();
  res.json({ ok: true });
});

app.get('/', (req, res) => {
  res.send('✅ BUUNIX Admin Backend is Live');
});

app.listen(3000, () => console.log('🌐 Admin API running on port 3000'));
