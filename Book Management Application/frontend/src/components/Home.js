import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';


const Home = () => {
  const [searchTerm, setSearchTerm] = useState('');

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Handle search form submission
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchTerm) {
      // Navigate to the search page with the search term
      window.location.href = `/search?query=${searchTerm}`;
    }
  };

  return (
    <div>
      <header>
        <nav>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/add">Add Book</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </nav>
      </header>

      <main>
        <h1>Welcome to the Book Management Application</h1>
        <p className='paragraph'>Manage your book collection with ease. Search for books, view details, and edit records.</p>
        
        {/* Search Form */}
        <div>
          <h2>Search for Books</h2>
          <form onSubmit={handleSearchSubmit}>
            <input
              type="text"
              placeholder="Search by title, author, or genre"
              value={searchTerm}
              onChange={handleSearchChange}
            />
            <button type="submit">Search</button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default Home;
