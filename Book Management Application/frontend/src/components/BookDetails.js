import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import '/BookDetails.css'

function BookDetails() {
  const { id } = useParams();
  const [book, setBook] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/books/${id}`)
      .then(response => setBook(response.data))
      .catch(error => console.error(error));
  }, [id]);

  if (!book) return <p>Loading...</p>;

  return (
    <div className="container mt-4">
      <h2>{book.title}</h2>
      <p>Author: {book.author.name}</p>
      <p>Genre: {book.genre.name}</p>
      <p>Pages: {book.pages}</p>
      <p>Published Date: {new Date(book.publishedDate).toLocaleDateString()}</p>
    </div>
  );
}

export default BookDetails;
