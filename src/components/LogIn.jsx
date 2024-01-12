import React from "react";
import {  useState } from "react";
import { Col, Button, Row, Container, Card, Form, Navbar, Nav } from "react-bootstrap";
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";

export default function LogIn() {
  const [username, setUsername] =useState('');
  const [password, setPassword] =useState('');
  const navigate = useNavigate();
  const login = async (event) => {
    event.preventDefault(); 

    try {
      
      const response = await axios.post('http://localhost:8080/login', { username, password });

      if (response.status === 200) {
        navigate('/register'); // to do must change the path
      } else {
        alert('Login failed: ' + response.data.message); 
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('An error occurred during login');
    }
  };
  return (
    <>
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="#home">Cooking Buddies</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
<Nav className="ms-auto">
            <Nav.Link href="/admin">Admin</Nav.Link>
        
</Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    <Container>
      <Row className="vh-100 d-flex justify-content-center align-items-center">
        <Col md={8} lg={6} xs={12}>
          <div className="border border-3 border-primary"></div>
          <Card className="shadow">
            <Card.Body>
              <div className="mb-3 mt-4">
                <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
                <p className=" mb-5">Please enter your login and password!</p>
                <Form className="mb-3">
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label className="text-center">
                      User name
                    </Form.Label>
                    <Form.Control type="text" placeholder="Enter Username" value={username}
                        onChange={(e) => setUsername(e.target.value)}/>
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" value={password}
                        onChange={(e) => setPassword(e.target.value)} />
                  </Form.Group>
                  <div className="mb-3">
                    <p className="small">
                      <a className="text-primary" href="#!">
                        Forgot password?
                      </a>
                    </p>
                  </div>
                  <div className="d-grid">
                    <Button variant="primary" type="submit" onClick={login} >
                      Login
                    </Button>
                  </div>
                </Form>
                <div className="mt-3">
                  <p className="mb-0  text-center">
                    Don't have an account?{" "}
                    <Link to="/register" className="text-primary fw-bold">
                      Sign Up
                    </Link>
                  </p>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
    </>
  );
}
