import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './App.css'; // Ensure this path is correct
import { Navbar, Nav, Dropdown } from 'react-bootstrap';
import { useAuth } from './AuthContext';
import '@fortawesome/fontawesome-free/css/all.min.css';
import CurrentTime from './Date';

const NavBar = () => {
  const { isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    // Perform logout actions
    logout();
    navigate('/'); // Redirect to home page
  };

  return (
    <Navbar variant="dark" expand="lg" id="navbarbg">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          <img
            id="mainlogo"
            src="https://purepng.com/public/uploads/large/purepng.com-shopping-cartshoppingcarttrolleycarriagebuggysupermarkets-14215265323129kdoe.png"
            alt="logo1"
          />
        </Link>

        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/" className="nav-link active" aria-current="page">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/SaveForLater" className="nav-link active">
              Saveforlater
            </Nav.Link>
            <Nav.Link as={Link} to="/pricing" className="nav-link active">
              Pricing
            </Nav.Link>
            
            <Dropdown>
              <Dropdown.Toggle variant="success" id="dropdown-basic">
                Dropdown Button
              </Dropdown.Toggle>
              <Dropdown.Menu id="dropdown-basic">
                <Dropdown.Item as={Link} to="/action-1">
                  Action
                </Dropdown.Item>
                <Dropdown.Item as={Link} to="/action-2">
                  Another action
                </Dropdown.Item>
                <Dropdown.Item as={Link} to="/action-3">
                  Something else
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            {isLoggedIn ? (
              <Nav.Link onClick={handleLogout} className="nav-link active">
                Logout
              </Nav.Link>
            ) : (
              <Nav.Link as={Link} to="/login" className="nav-link active">
                Login
              </Nav.Link>
            )}
            <Nav.Link as={Link} to="/signup" className="nav-link active">
              Signup
            </Nav.Link>
            <Nav.Link id="time" to="#" className="nav-link active">
            <CurrentTime />
              </Nav.Link>
          </Nav>
          <div className="d-flex align-items-center">   
            <form className="d-flex ms-3" role="search">
              <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
              <button className="btn btn-outline-light" type="submit">
                Search
              </button>
            </form>
            <Nav.Link as={Link} to="/cart" className="nav-link active" id="cartsimbol">
              <i className="fas fa-shopping-cart">Cart</i>
            </Nav.Link>
          </div>
        </Navbar.Collapse>
      </div>
    </Navbar>
  );
};

export default NavBar;
