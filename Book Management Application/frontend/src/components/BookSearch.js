import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const BookSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [books, setBooks] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  // Fetch books based on the search term
  const fetchBooks = async (term) => {
    try {
      const response = await fetch(`http://localhost:5000/api/books/search?title=${encodeURIComponent(term)}`);
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('No books found.');
        } else {
          throw new Error('Failed to fetch books');
        }
      }
      const data = await response.json();
      if (data.length === 0) {
        setErrorMessage('No books found with the given search term.');
      } else {
        setErrorMessage(''); // Clear error if data is found
        setBooks(data);
      }
    } catch (error) {
      console.error('Error searching for books:', error);
      setErrorMessage('An error occurred while fetching data. Please try again.');
      setBooks([]); // Reset books on error
    }
  };

  // Handle the search form submission
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      fetchBooks(searchTerm.trim());
    } else {
      setErrorMessage('Please enter a valid search term.');
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleBookClick = (id) => {
    navigate(`/edit/${id}`);
  };

  return (
    <div className="container">
      <h2>Search Books</h2>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          className="form-control"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Search by title"
        />
        <button type="submit" className="btn btn-primary mt-2">
          Search
        </button>
      </form>

      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

      <div className="book-list mt-3">
        {books.length > 0 ? (
          books.map((book) => (
            <div
              key={book.id}
              className="book-item border p-2 mb-2"
              onClick={() => handleBookClick(book.id)}
            >
              <h3>{book.title}</h3>
              <p>Author ID: {book.authorID}</p>
              <p>Genre ID: {book.genreID}</p>
            </div>
          ))
        ) : (
          <p>No books found.</p>
        )}
      </div>
    </div>
  );
};

export default BookSearch;
