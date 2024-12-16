import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './BookList.css';


const BookList = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/books');
      const data = await response.json();
      setBooks(data);
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/books/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        alert('Book deleted successfully');
        fetchBooks(); // Refresh the book list
      } else {
        alert('Failed to delete the book');
      }
    } catch (error) {
      console.error('Error deleting book:', error);
    }
  };

  return (
    <div>
      <h2>Book List</h2>
      <Link to="/add">Add New Book</Link>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Author ID</th>
            <th>Genre ID</th>
            <th>Pages</th>
            <th>Published Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr key={book.id}>
              <td>{book.title}</td>
              <td>{book.authorID}</td>
              <td>{book.genreID}</td>
              <td>{book.pages}</td>
              <td>{book.publishedDate}</td>
              <td>
                <Link to={`/edit/${book.id}`}>Edit</Link>
                <button onClick={() => handleDelete(book.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BookList;
