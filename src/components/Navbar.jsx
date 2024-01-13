import React from "react";
import { Container, Navbar, Nav,Row, Col } from "react-bootstrap";
import { Link } from 'react-router-dom';

//TODO: Add logic if signed in to show my account etc.

export default function Navigation() {

  const logout = async () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("role");
  };
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="/">
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
            {localStorage.getItem('role') === 'admin' && <Nav.Link><Link to="/courses/create">Create a Course</Link></Nav.Link>}
            <Nav.Link><Link to="/courses">View All Courses</Link></Nav.Link>
            <Nav.Link><Link to="/dashboard">My Account</Link></Nav.Link>
            <Nav.Link onClick={() => logout()}><Link to="/">logout</Link></Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
