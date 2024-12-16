const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Create or connect to the SQLite database
const db = new sqlite3.Database(path.resolve(__dirname, 'book_management.db'), (err) => {
  if (err) {
    console.error('Error connecting to the database:', err.message);
  } else {
    console.log('Connected to SQLite database.');
  }
});

// Create tables
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS Authors (
      AuthorID INTEGER PRIMARY KEY AUTOINCREMENT,
      Name TEXT NOT NULL
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS Genres (
      GenreID INTEGER PRIMARY KEY AUTOINCREMENT,
      Name TEXT NOT NULL,
      Description TEXT
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS Books (
      BookID INTEGER PRIMARY KEY AUTOINCREMENT,
      Title TEXT NOT NULL,
      AuthorID INTEGER,
      GenreID INTEGER,
      Pages INTEGER,
      PublishedDate TEXT,
      FOREIGN KEY (AuthorID) REFERENCES Authors(AuthorID),
      FOREIGN KEY (GenreID) REFERENCES Genres(GenreID)
    )
  `);
});

module.exports = db;
