const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');

const app = express();
const port = 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors()); // Enable CORS for frontend-backend interaction

// Initialize SQLite database
const db = new sqlite3.Database('books.db', (err) => {
  if (err) {
    console.error('Error connecting to SQLite database:', err.message);
  } else {
    console.log('Connected to SQLite database');
  }
});

// Create the `books` table if it doesn't exist
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS books (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      authorID TEXT NOT NULL,
      genreID TEXT NOT NULL,
      pages INTEGER NOT NULL,
      publishedDate TEXT NOT NULL
    )
  `, (err) => {
    if (err) {
      console.error('Error creating table:', err.message);
    } else {
      console.log('Books table ensured to exist');
    }
  });
});

// REST API Endpoints (GET, POST, PUT, DELETE)

// GET - Fetch all books
app.get('/api/books', (req, res) => {
  db.all('SELECT * FROM books', [], (err, rows) => {
    if (err) {
      console.error(err.message);
      res.status(500).json({ message: 'Error fetching books', error: err.message });
    } else {
      res.status(200).json(rows);
    }
  });
});

// POST - Add a new book
app.post('/api/books', (req, res) => {
  const { title, authorID, genreID, pages, publishedDate } = req.body;

  if (!title || !authorID || !genreID || !pages || !publishedDate) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const sql = `INSERT INTO books (title, authorID, genreID, pages, publishedDate) VALUES (?, ?, ?, ?, ?)`;
  const params = [title, authorID, genreID, pages, publishedDate];

  db.run(sql, params, function (err) {
    if (err) {
      console.error(err.message);
      res.status(500).json({ message: 'Failed to add book', error: err.message });
    } else {
      res.status(201).json({
        id: this.lastID,
        title,
        authorID,
        genreID,
        pages,
        publishedDate,
      });
    }
  });
});

// PUT - Update a book
app.put('/api/books/:id', (req, res) => {
  const { id } = req.params;
  const { title, authorID, genreID, pages, publishedDate } = req.body;

  if (!title || !authorID || !genreID || !pages || !publishedDate) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const sql = `UPDATE books SET title = ?, authorID = ?, genreID = ?, pages = ?, publishedDate = ? WHERE id = ?`;
  const params = [title, authorID, genreID, pages, publishedDate, id];

  db.run(sql, params, function (err) {
    if (err) {
      console.error(err.message);
      res.status(500).json({ message: 'Failed to update book', error: err.message });
    } else {
      res.status(200).json({ message: 'Book updated successfully' });
    }
  });
});

// DELETE - Remove a book
app.delete('/api/books/:id', (req, res) => {
  const { id } = req.params;

  const sql = `DELETE FROM books WHERE id = ?`;
  db.run(sql, id, function (err) {
    if (err) {
      console.error(err.message);
      res.status(500).json({ message: 'Failed to delete book', error: err.message });
    } else {
      res.status(200).json({ message: 'Book deleted successfully' });
    }
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
