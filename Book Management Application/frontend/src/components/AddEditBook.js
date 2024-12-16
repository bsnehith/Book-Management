import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const AddEditBook = () => {
  const [book, setBook] = useState({
    title: '',
    authorID: '',
    genreID: '',
    pages: '',
    publishedDate: '',
  });

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      fetchBook(id);
    }
  }, [id]);

  const fetchBook = async (bookId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/books/${bookId}`);
      const data = await response.json();
      setBook(data);
    } catch (error) {
      console.error('Error fetching book:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBook({ ...book, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `http://localhost:5000/api/books${id ? `/${id}` : ''}`,
        {
          method: id ? 'PUT' : 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(book),
        }
      );

      if (response.ok) {
        alert(`Book ${id ? 'updated' : 'added'} successfully`);
        navigate('/');
      } else {
        alert('Failed to save the book');
      }
    } catch (error) {
      console.error('Error saving book:', error);
    }
  };

  return (
    <div>
      <h2>{id ? 'Edit Book' : 'Add Book'}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          value={book.title}
          onChange={handleChange}
          placeholder="Title"
          required
        />
        <input
          type="text"
          name="authorID"
          value={book.authorID}
          onChange={handleChange}
          placeholder="Author ID"
          required
        />
        <input
          type="text"
          name="genreID"
          value={book.genreID}
          onChange={handleChange}
          placeholder="Genre ID"
          required
        />
        <input
          type="number"
          name="pages"
          value={book.pages}
          onChange={handleChange}
          placeholder="Pages"
          required
        />
        <input
          type="date"
          name="publishedDate"
          value={book.publishedDate}
          onChange={handleChange}
          required
        />
        <button type="submit">{id ? 'Update' : 'Add'} Book</button>
      </form>
    </div>
  );
};

export default AddEditBook;
