import React from "react";
import { Container, Navbar, Nav } from "react-bootstrap";
import { Link } from 'react-router-dom';

//TODO: Add logic if signed in to show my account etc.

export default function Navigation() {
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="/">Cooking Buddies</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link><Link to="/courses/create">Create a Course</Link></Nav.Link>
            <Nav.Link><Link to="/courses">View All Courses</Link></Nav.Link>
            
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
