import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './NavBar';
import Home from './home'; // Ensure this path is correct
import './App.css'; // Ensure this path is correct
import './Footer.css';
import { CartProvider } from './CartContext';
import Footer from './footer';
import Login from './login'; // Correct capitalization
import Signup from './Signup';
import Waste from './waste';
import Mobiles from './Mobiles';
import Cart from './Cart';
import Fashion from './Fashion';
import Electronics from './Electronics';
import Furniture from './Furniture';
import Appliances from './Appliances';
import Toys from './Toys';
import SaveForLater from './SaveForLater';
import { SaveForLaterProvider } from './SaveForLaterContext';

const App = () => {
  return (
    <Router>
      <CartProvider>
        <SaveForLaterProvider>
          <NavBar />
          <div className="mt-6">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/features" element={<h2>Features Page</h2>} />
              <Route path="/pricing" element={<h2>Pricing Page</h2>} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/save-for-later" element={<SaveForLater />} />
              <Route path="/fashion" element={<Fashion />} />
              <Route path="/electronics" element={<Electronics />} />
              <Route path="/furniture" element={<Furniture />} />
              <Route path="/appliances" element={<Appliances />} />
              <Route path="/toys" element={<Toys />} />
              <Route path="/waste" element={<Waste />} />
              <Route path="/mobiles" element={<Mobiles />} />
              
            </Routes>
          </div>
          <Footer />
        </SaveForLaterProvider>
      </CartProvider>
    </Router>
  );
};

export default App;
