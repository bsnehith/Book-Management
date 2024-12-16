const express = require('express');
const db = require('../database/db');
const router = express.Router();

// Get all books
router.get('/', (req, res) => {
  const query = `
    SELECT Books.BookID, Books.Title, Authors.Name AS Author, Genres.Name AS Genre, 
           Books.Pages, Books.PublishedDate
    FROM Books
    LEFT JOIN Authors ON Books.AuthorID = Authors.AuthorID
    LEFT JOIN Genres ON Books.GenreID = Genres.GenreID
  `;

  db.all(query, [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json(rows);
    }
  });
});

// Add a new book
router.post('/', (req, res) => {
  const { title, authorID, genreID, pages, publishedDate } = req.body;
  const query = `
    INSERT INTO Books (Title, AuthorID, GenreID, Pages, PublishedDate)
    VALUES (?, ?, ?, ?, ?)
  `;

  db.run(query, [title, authorID, genreID, pages, publishedDate], function (err) {
    if (err) {
      res.status(400).json({ error: err.message });
    } else {
      res.status(201).json({ BookID: this.lastID });
    }
  });
});

// Update a book
router.put('/:id', (req, res) => {
  const { title, authorID, genreID, pages, publishedDate } = req.body;
  const query = `
    UPDATE Books
    SET Title = ?, AuthorID = ?, GenreID = ?, Pages = ?, PublishedDate = ?
    WHERE BookID = ?
  `;

  db.run(query, [title, authorID, genreID, pages, publishedDate, req.params.id], function (err) {
    if (err) {
      res.status(400).json({ error: err.message });
    } else {
      res.json({ changes: this.changes });
    }
  });
});

// Delete a book
router.delete('/:id', (req, res) => {
  const query = `DELETE FROM Books WHERE BookID = ?`;

  db.run(query, [req.params.id], function (err) {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json({ changes: this.changes });
    }
  });
});

module.exports = router;
