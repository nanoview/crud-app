import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bookRoutes from './routes/bookRoutes.js';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Mount API routes expected by the frontend
app.use('/api/books', bookRoutes);

// Connect to MongoDB and start server
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => {
    console.error('MongoDB connection error:', err.message);
    console.log('Starting server in offline fallback mode (in-memory data).');

    // Fallback in-memory router that mirrors the API in routes/bookRoutes.js
    import('express').then(({ Router }) => {
      const router = Router();
      let nextId = 1;
      const books = [];

      router.post('/', (req, res) => {
        const book = { id: String(nextId++), ...req.body };
        books.push(book);
        res.json(book);
      });

      router.get('/', (req, res) => {
        res.json(books);
      });

      router.put('/:id', (req, res) => {
        const idx = books.findIndex(b => b.id === req.params.id);
        if (idx === -1) return res.status(404).json({ message: 'Not found' });
        books[idx] = { ...books[idx], ...req.body };
        res.json(books[idx]);
      });

      router.delete('/:id', (req, res) => {
        const idx = books.findIndex(b => b.id === req.params.id);
        if (idx === -1) return res.status(404).json({ message: 'Not found' });
        books.splice(idx, 1);
        res.json({ message: 'Deleted' });
      });

      app.use('/api/books', router);
      app.listen(PORT, () => console.log(`Server running in offline mode on port ${PORT}`));
    }).catch(e => {
      console.error('Failed to initialize fallback router:', e.message || e);
      process.exit(1);
    });
  });
