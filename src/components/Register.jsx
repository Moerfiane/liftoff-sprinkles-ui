import React from "react";
import {  useState } from "react";
import {
  InputGroup,
  Col,
  Button,
  Row,
  Container,
  Card,
  Form,Navbar, Nav
} from "react-bootstrap";
import Navigation from "./Navbar";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';


//TODO: Add e-mail field
//TODO: Add e-mail confirmation logic

export default function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [verifyPassword, setVerifyPassword] = useState('');
  const navigate = useNavigate();
  const handleRegister = async (event) => {
    event.preventDefault(); 
    if (password !== verifyPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const response = await fetch('http://localhost:8080/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password, verifyPassword }),
      });

      const data = await response.json();
      console.log('Response Body:', data);

      
      if (data.success) {
        localStorage.setItem("userId", data.userId);
        localStorage.setItem("role", data.role);
        if(data.role === 'admin') {
          navigate('/courses/create'); 
        } else  {
          navigate('/courses'); 
        }

        
      } else {
        alert(data.message); 
      }
    } catch (error) {
      console.error('Registration error:', error);
      alert('An error occurred during registration');
    }
  };


  return (
    <>
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="/">Cooking Buddies</Navbar.Brand>
      </Container>
    </Navbar>
    <Container>
      <Row className="vh-100 d-flex justify-content-center align-items-center">
        <Col md={10} lg={8} xs={12}>
          <Card className="shadow">
            <Card.Body>
              <div className="mb-3 mt-4">
                <h2 className="fw-bold mb-2 text-uppercase">REGISTER NEW USER</h2>
                <p className=" mb-5">Please enter your details to join us!</p>
                
                <Form className="mb-3">
                  <Form.Group className="mb-3" controlId="formFulName">
                    <Form.Label className="text-center">
                      User name
                    </Form.Label>
                    <Form.Control type="text" placeholder="Enter name" value={username} onChange={(e) => setUsername(e.target.value)}/>
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" value={password}
                      onChange={(e) => setPassword(e.target.value)} />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Verify Password</Form.Label>
                    <Form.Control type="password" placeholder="verifyPassword" value={verifyPassword}
                      onChange={(e) => setVerifyPassword(e.target.value)}/>
                  </Form.Group>
                  <div className="d-grid">
                    <Button variant="primary" type="submit" onClick={handleRegister} >
                    Register
                    </Button>
                  </div>
                </Form>
                <div className="mt-3">
                  <p className="mb-0  text-center">
                    Already have an account?{" "}
                    <Link to="/login" className="text-primary fw-bold">
                      Sign In
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