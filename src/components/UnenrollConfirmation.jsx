import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Card, Button, Container, Row, Col, Alert } from "react-bootstrap";
import Navigation from "./Navbar";

const UnenrollConfirmationPage = () => {
  const navigate = useNavigate();
  const { courseId, userId } = useParams();

  const [show, setShow] = useState(false);
  const [alertBody, setAlertBody] = useState('');

  const handleUnenrollment = async () => {
    try {
      const response = await fetch(`http://localhost:8080/unenroll/${userId}/${courseId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (data.success) {
        navigate("/courses");
      } else {
        setAlertBody(data.message || "An error occurred during unenrollment.");
        setShow(true);
      }
    } catch (error) {
      console.error('Error unenrolling from course', error);
      setAlertBody("An error occurred.");
      setShow(true);
    }
  };

  return (
    <>
      <Navigation />
      <Container className="vh-100 vw-100 d-flex justify-content-center">
        <Row className="mt-5 d-flex justify-content-center">
          <Col md={8} lg={6} xs={12} className="d-flex flex-column align-items-center">
            <Card className="shadow" style={{ width: '18rem' }}>
              <h2 className="fw-bold m-2 text-uppercase">Confirm Unenrollment</h2>
              <p className="m-3">Are you sure you want to unenroll from this course?</p>
              <div className="d-grid m-3">
                <Button className="mb-3 mt-3" variant="danger" onClick={handleUnenrollment}>Unenroll</Button>
                <Button variant="secondary" onClick={() => navigate(-1)}>Cancel</Button>
              </div>
            </Card>
            <Alert className="mt-5" show={show} variant="warning">{alertBody}</Alert>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default UnenrollConfirmationPage;