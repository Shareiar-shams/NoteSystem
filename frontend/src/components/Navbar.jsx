import React from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { setAuthToken } from '../utils/auth';

const AppNavbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    setAuthToken(null);
    navigate('/login');
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="mb-4">
      <Container>
        <Navbar.Brand>Workspace Notes</Navbar.Brand>
        <Nav className="ms-auto">
          <Nav.Link href="/private">Private</Nav.Link>
          <Nav.Link href="/public">Public Directory</Nav.Link>
          <Nav.Link href="/notes/create">+ New Note</Nav.Link>
          <Button variant="outline-light" size="sm" onClick={handleLogout}>
            Logout
          </Button>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default AppNavbar;