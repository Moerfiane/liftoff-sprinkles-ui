import React from "react";
import {
  InputGroup,
  Col,
  Button,
  Row,
  Container,
  Card,
  Form,Navbar, Nav
} from "react-bootstrap";
import { Link } from 'react-router-dom';
import Navigation from "./Navbar";

//TODO: Add e-mail field
//TODO: Add e-mail confirmation logic

export default function Register() {
  return (
    <>
    <Navigation />
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
                    <Form.Control type="text" placeholder="Enter name" />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Verify Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" />
                  </Form.Group>
                  <div className="d-grid">
                    <Button variant="primary" type="submit">
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
