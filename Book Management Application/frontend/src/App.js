// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import BookList from './components/BookList';
import AddEditBook from './components/AddEditBook';
import BookSearch from './components/BookSearch'; // Import BookSearch once
import Home from './components/Home'; // Import Home component

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/home" element={<Home />} /> {/* Render Home component */}
        <Route path="/" element={<BookList />} />
        <Route path="/add" element={<AddEditBook />} />
        <Route path="/edit/:id" element={<AddEditBook />} />
        <Route path="/search" element={<BookSearch />} /> {/* Single /search route */}
      </Routes>
    </Router>
  );
};

export default App;
