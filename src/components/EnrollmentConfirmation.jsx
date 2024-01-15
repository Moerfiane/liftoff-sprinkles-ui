import Navigation from "./Navbar";
import { Card, Button, Container, Row, Col, Alert} from "react-bootstrap";
import {useLocation , useNavigate} from 'react-router-dom';
import { sendData } from "../utilities/sendData";
import { useState } from "react";

const EnrollConfirmationPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const course = location.state;
  const user = localStorage.getItem('userId');

  const [show, setShow] = useState(false);
  const [alertBody, setAlertBody] = useState('');

  const data = {
    courseId: course,
    userId: parseInt(user),
  }

  const handleEnrollment = async (e) => {
    e.preventDefault();
    console.log(data);
    let response = await sendData('/courses/enroll', 'POST', {'Content-Type': 'application/json'}, data);
    console.log(response);
    if (response.success) {
      navigate(`/courses/view/${course}`);
    } else {
      setAlertBody("You're already enrolled in this course");
      setShow(true);
    }
  }

    return (
        <>
            <Navigation />
            <Container className="vh-100 vw-100 d-flex justify-content-center ">
              <Row className="mt-5 d-flex justify-content-center ">
                <Col md={8} lg={6} xs={12} className="d-flex flex-column align-items-center">
                  <Card className="shadow" style={{ width: '18rem' }}>
                    <h2 className="fw-bold m-2 text-uppercase">Confirm your enrollment</h2>
                    <p className="m-3">Are you sure you want to enroll in that course?</p>
                    <div className="d-grid m-3">
                      <Button className="mb-3 mt-3" variant="primary" onClick={handleEnrollment}>Enroll me!</Button>
                      <Button variant="danger">Nevermind</Button>
                    </div>
                  </Card>
                  <Alert className="mt-5" show={show} variant="warning">{alertBody}</Alert>
                </Col>
              </Row>
            </Container>
        </>
    )
}

export default EnrollConfirmationPage;