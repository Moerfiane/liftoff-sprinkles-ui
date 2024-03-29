import React from "react";
import {  useState, useContext } from "react";
import { Col, Button, Row, Container, Card, Form, Navbar, Nav } from "react-bootstrap";
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import Navigation from "./Navbar";
import { LoginContext } from "../utilities/checkLogin";


export default function LogIn() {
  const { isLoggedIn, setIsLoggedIn } = useContext(LoginContext);

  const navigate = useNavigate();

  const loginUser = async (event, username, password) => {
    event.preventDefault(); 
    try {
      const response = await axios.post('http://localhost:8080/login', { username, password });
      console.log(response);
      //added nested if statement to navigate
      if (response.data.success) {
        localStorage.setItem("userId", response.data.userId);
        localStorage.setItem("role", response.data.role);
        setIsLoggedIn(true);
        if(response.data.role === 'admin') {
          navigate('/courses/create'); 
          setIsLoggedIn(true);
        } else  {
          navigate('/courses'); 
        }

      } else {
        alert(response.data.message); 
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('An error occurred during login');
    }
  };
  
  return (
    <>
      <Navigation />
      <Container>
        <Row className="vh-100 d-flex justify-content-center align-items-center">
          <Col md={8} lg={6} xs={12}>
            <Card className="shadow">
              <Card.Body>
                {isLoggedIn ? "You're already logged in" : <LoginForm loginUser={loginUser}/>}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    
    </>
  );
}

const LoginForm = ({loginUser}) => {
  const [username, setUsername] =useState('');
  const [password, setPassword] =useState('');
  return (
  <div className="mb-3 mt-4">
  <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
  <p className=" mb-5">Please enter your login and password!</p>
  <Form className="mb-3">
    <Form.Group className="mb-3" controlId="formBasicUsername">
      <Form.Label className="text-center">
        Username
      </Form.Label>
      <Form.Control type="text" placeholder="Enter username" value={username}
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
      <Button variant="primary" type="button" onClick={(e) => loginUser(e, username, password)} >
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
)};