import Navigation from "./Navbar";
import { Card, Button, Container, Row, Col, Alert } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
import { sendData } from "../utilities/sendData";
import { useState } from "react";

const FavoriteCoursePage = () => {
  const navigate = useNavigate();
  const course = parseInt(localStorage.getItem('selectedCourseId'));
  const user = parseInt(localStorage.getItem('userId'));

  const [show, setShow] = useState(false);
  const [alertBody, setAlertBody] = useState('');

  const data = {
    courseId: course,
    userId: user,
  }

  const handleFavorite = async (e) => {
    e.preventDefault();
    console.log(data);
    let response = await sendData('/courses/favorite', 'POST', {'Content-Type': 'application/json'}, data);
    console.log(response);
    if (response.success) {
        navigate(`/courses/view/{courseId}`);
    } else {
      setAlertBody("An error occurred while favoriting the course");
      setShow(true);
    }
  }

  return (
    <>
      <Navigation />
      <Container className="vh-100 vw-100 d-flex justify-content-center">
        <Row className="mt-5 d-flex justify-content-center">
          <Col md={8} lg={6} xs={12} className="d-flex flex-column align-items-center">
            <Card className="shadow" style={{ width: '18rem' }}>
              <h2 className="fw-bold m-2 text-uppercase">Favorite this Course</h2>
              <p className="m-3">Are you sure you want to add this course to your favorites?</p>
              <div className="d-grid m-3">
                <Button className="mb-3 mt-3" variant="primary" onClick={handleFavorite}>Add to Favorites</Button>
                <Button variant="danger">Cancel</Button>
              </div>
            </Card>
            <Alert className="mt-5" show={show} variant="warning">{alertBody}</Alert>
        </Col>
        </Row>
    </Container>
    </>
)
}

export default FavoriteCoursePage;