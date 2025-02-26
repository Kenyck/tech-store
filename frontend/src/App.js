import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AddProduct from './pages/AddProduct';
import SearchProduct from './pages/SearchProduct';
import Navbar from './components/Navbar';

function App() {
  return (
    <Router>
      <Navbar />
      <div className="container mx-auto p-4">
        <Routes>
          <Route path="/" element={<SearchProduct />} />
          <Route path="/add" element={<AddProduct />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;