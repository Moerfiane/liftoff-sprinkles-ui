import React, {useState} from "react";
import { Container, Navbar, Nav,Row, Col } from "react-bootstrap";
import { Link } from 'react-router-dom';

export default function Navigation() {
  

  function handleLogin() {
    if (localStorage.getItem('userId') !== null) {
      setIsLoggedIn(true);
    }
  }

  const logout = async () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("role");
    setIsLoggedIn(false);
  };
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        {/* Consider updating "home" to an about page */}
        <Navbar.Brand href="/courses">
          <Row>
            <Col className="d-flex align-items-center">
            <img src="http://localhost:5173/assets/noun-chef-128.png" height='80px' className="p-1" />
            </Col>
            <Col className="d-flex align-items-center">
              <h1>Cooking Buddies</h1>
            </Col>
          </Row>
          </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
          <Nav.Link><Link to="/courses">View All Courses</Link></Nav.Link>
            {isLoggedIn ? <LoggedInMenu logoutUser={logout} /> : <Nav.Link><Link to="/login">Login</Link></Nav.Link>}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

const LoggedInMenu = ({logoutUser}) => (
  <>
    {localStorage.getItem('role') === 'admin' && <Nav.Link><Link to="/courses/create">Create a Course</Link></Nav.Link>}
    <Nav.Link><Link to="/dashboard">My Account</Link></Nav.Link>
    <Nav.Link onClick={() => logoutUser()}><Link to="/">Logout</Link></Nav.Link>
  </>
)